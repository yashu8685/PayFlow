from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from openpyxl import Workbook
from django.http import HttpResponse

from .models import Payment
from .serializers import PaymentSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment(request):

    serializer = PaymentSerializer(data=request.data)

    if serializer.is_valid():

        upi_id = serializer.validated_data["upi_id"]

        receiver = serializer.validated_data["receiver_name"]

        amount = serializer.validated_data["amount"]

        upi_link = (
            f"upi://pay?"
            f"pa={upi_id}"
            f"&pn={receiver}"
            f"&am={amount}"
            f"&cu=INR"
        )

        payment = serializer.save(
            user=request.user,
            upi_link=upi_link
        )

        return Response({
            "message": "Payment Created",
            "upi_link": payment.upi_link
        })

    return Response(serializer.errors, status=400)





from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from .serializers import PaymentSerializer

from django.db.models import Sum

@api_view(["GET"])
@permission_classes([IsAuthenticated])

def payment_history(request):

    payments = Payment.objects.filter(
        user=request.user
    ).order_by("-created_at")

    serializer = PaymentSerializer(
        payments,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):

    payments = Payment.objects.filter(user=request.user)

    total_payments = payments.count()

    completed = payments.filter(status="Completed").count()

    pending = payments.filter(status="Pending").count()

    failed = payments.filter(status="Failed").count()

    total_amount = (
        payments.aggregate(total=Sum("amount"))["total"] or 0
    )

    return Response({
        "total_payments": total_payments,
        "completed": completed,
        "pending": pending,
        "failed": failed,
        "total_amount": total_amount,
    })


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_payment_status(request, payment_id):

    try:
        payment = Payment.objects.get(
            id=payment_id,
            user=request.user
        )

    except Payment.DoesNotExist:
        return Response(
            {"error": "Payment not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    new_status = request.data.get("status")

    if new_status not in ["Pending", "Completed", "Failed"]:
        return Response(
            {"error": "Invalid Status"},
            status=status.HTTP_400_BAD_REQUEST
        )

    payment.status = new_status
    payment.save()

    return Response({
        "message": "Status Updated Successfully"
    })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_excel(request):
    payments = Payment.objects.filter(user=request.user)

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Payments"

    sheet.append([
        "Receiver",
        "UPI ID",
        "Amount",
        "Status",
        "Date",
    ])

    for payment in payments:
        sheet.append([
            payment.receiver_name,
            payment.upi_id,
            float(payment.amount),
            payment.status,
            payment.created_at.strftime("%d-%m-%Y"),
        ])

    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

    response["Content-Disposition"] = 'attachment; filename="payments.xlsx"'

    workbook.save(response)

    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_pdf(request):
    payments = Payment.objects.filter(user=request.user)

    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="payments.pdf"'

    doc = SimpleDocTemplate(response)

    data = [
        ["Receiver", "UPI ID", "Amount", "Status", "Date"]
    ]

    for payment in payments:
        data.append([
            payment.receiver_name,
            payment.upi_id,
            f" ₹ {payment.amount}",
            payment.status,
            payment.created_at.strftime("%d-%m-%Y"),
        ])

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

        ("GRID", (0, 0), (-1, -1), 1, colors.black),

        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

        ("ALIGN", (0, 0), (-1, -1), "CENTER"),

        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
    ]))

    doc.build([table])

    return response



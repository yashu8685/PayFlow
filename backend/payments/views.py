from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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

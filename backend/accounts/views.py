from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(["GET"])
def hello(request):
    return Response({
        "message": "Welcome to PayFlow API 🚀"
    })


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import ProfileSerializer


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request):

    if request.method == "GET":

        serializer = ProfileSerializer(request.user)

        return Response(serializer.data)

    serializer = ProfileSerializer(
        request.user,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)

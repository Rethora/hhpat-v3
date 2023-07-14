from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail


class UserSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        subject = "Welcome to HHPAT"
        message = f"Hi {serializer.data.get('first_name')} {serializer.data.get('last_name')}, this is a test!"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [
            serializer.data.get("email"),
        ]
        # * Only send emails if prod env
        if not settings.DEBUG:
            send_mail(subject, message, email_from, recipient_list)

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Entry

from .serializers import EntrySerializer


class UserEntryView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = EntrySerializer

    def get_queryset(self):
        return self.request.user.entry_set.all()


class AdminEntryView(viewsets.ModelViewSet):
    serializer_class = EntrySerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = Entry.objects.all()
        user = self.request.query_params.get("user")
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

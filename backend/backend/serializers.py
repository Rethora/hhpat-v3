from rest_framework import serializers
from django.contrib.auth.models import User

from entry.serializers import EntrySerializer


class UserSerializer(serializers.ModelSerializer):
    entries = serializers.SerializerMethodField()

    def get_entries(self, instance):
        return EntrySerializer(instance.entry_set.all(), many=True).data

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "first_name",
            "last_name",
            "is_staff",
            "is_superuser",
            "entries",
        ]

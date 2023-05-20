from django.shortcuts import render
from rest_framework import viewsets

from .models import Entry

from .serializers import EntrySerializer

class EntryView(viewsets.ModelViewSet):
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()

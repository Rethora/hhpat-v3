from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Entry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    weight = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    systolic = models.IntegerField(blank=True, null=True)
    diastolic = models.IntegerField(blank=True, null=True)
    blood_glucose = models.IntegerField(blank=True, null=True)
    resting_metabolic_rate = models.IntegerField(blank=True, null=True)
    cholesterol = models.IntegerField(blank=True, null=True)
    low_density_lipoprotein = models.IntegerField(blank=True, null=True)
    high_density_lipoprotein = models.IntegerField(blank=True, null=True)
    triglycerides = models.IntegerField(blank=True, null=True)
    vo2 = models.IntegerField(blank=True, null=True)
    sleep_score = models.IntegerField(blank=True, null=True)
    stress_score = models.IntegerField(blank=True, null=True)
    comments = models.TextField(blank=True, null=True)


from django.contrib import admin

from entry.models import Entry


# Register your models here.
class EntryAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")
    readonly_fields = ("created_at", "updated_at")


admin.site.register(Entry, EntryAdmin)

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views as user_views
from entry import views as entry_views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

schema_view = get_schema_view(
    openapi.Info(
        title="HHPAT API",
        default_version="v1",
    ),
    public=True,
    # TODO: change to admins
    permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r"admin/users", user_views.UserView, "admin_user")
router.register(r"admin/entries", entry_views.AdminEntryView, "admin_entry")
router.register(r"user/entries", entry_views.UserEntryView, "user_entry")

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("user-summary/", user_views.UserSummaryView.as_view(), name="user_summary"),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path(
        "playground/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("docs/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

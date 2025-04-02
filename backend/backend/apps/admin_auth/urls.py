from django.urls import path

from .views import LoginView, UserView

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("user/register", UserView.as_view(), name="user_registration"),
    path("user/<int:user_id>", UserView.as_view(), name="user_id"),
    path("user", UserView.as_view(), name="list_users"),
]
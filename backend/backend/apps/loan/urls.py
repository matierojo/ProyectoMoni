from django.urls import path

from .views import LoanSimulationView, LoanUserView, LoanView, LoanPaidView

urlpatterns = [
    path("", LoanView.as_view(), name="loan"),
    path("<int:loan_id>", LoanView.as_view(), name="delete_loan"),
    path("user/<int:user_id>", LoanUserView.as_view(), name="loan_user"),
    path("<int:loan_id>/mark-paid", LoanPaidView.as_view(), name="loan"),
    path("simulate", LoanSimulationView.as_view(), name="loan_simulation")
]
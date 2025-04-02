from django.db import models

from admin_auth.constantes import GENDER_CHOICES

# Create your models here.
class LoanApplicant(models.Model):
    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_birth = models.DateField()
    number_identification = models.CharField(max_length=8, unique=True)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.name.title()} {self.last_name.title()}"


class Loan(models.Model):
    # Le damos al posibilidad al usuario de registrarse o no para sacar un prestamo.
    loan_applicant = models.ForeignKey(LoanApplicant, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey("admin_auth.User", on_delete=models.CASCADE, blank=True, null=True)
    net_amount = models.FloatField()
    interest_rate = models.FloatField()
    total_amount = models.FloatField()
    number_installments = models.IntegerField()
    paid = models.BooleanField(default=False)

    def get_holder(self):
        if self.user:
            return self.user
        else:
            return self.loan_applicant


class LoanInstallment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    number = models.IntegerField()
    amount = models.FloatField()
    expiration_date = models.DateTimeField()
    paid = models.BooleanField(default=False)
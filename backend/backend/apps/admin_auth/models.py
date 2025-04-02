from django.db import models
from django.contrib.auth.hashers import make_password, check_password

from .constantes import GENDER_CHOICES, ROLES_USER

class User(models.Model):
    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_birth = models.DateField()
    role = models.CharField(max_length=255, choices=ROLES_USER, default=ROLES_USER[1][0])
    number_identification = models.CharField(max_length=8, unique=True)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name.title()} {self.last_name.title()}"

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
# Generated by Django 5.1.7 on 2025-04-01 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_auth', '0005_alter_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Administrador'), ('client', 'Cliente')], default='client', max_length=255),
        ),
    ]

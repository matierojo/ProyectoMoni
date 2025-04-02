import re
import secrets

from rest_framework import serializers

from .models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data["email"]
        password = data["password"]
        
        # Buscar usuario sin get_object_or_404
        user = User.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError("El email no se encuentra registrado!")
        
        # Verificar contraseña
        if not user.check_password(password):
            raise serializers.ValidationError("Contraseña incorrecta!")
        
        data = super().validate(data)
        data["user"] = user
        return data        

    def to_representation(self, instance):
        return {
            "token": secrets.token_hex(16),
            "role": instance['user'].role,
            "user_id": instance['user'].id
        }
        

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    def validate_password(self, value):
        """Valida que la contraseña tenga al menos una mayúscula, una minúscula y un número."""
        if not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$", value):
            raise serializers.ValidationError(
                "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener al menos 6 caracteres."
            )
        return value
    
    def validate(self, data):
        if User.objects.filter(email=data['email']):
            raise serializers.ValidationError({"error": "Ya existe un usuario registrado con este email!"})
        return super().validate(data)


    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # Hashea la contraseña
        user.save()
        return user

    def to_representation(self, instance):
        user = super().to_representation(instance)
        user['role'] = instance.get_role_display()
        user['gender'] = instance.get_gender_display()

        return user

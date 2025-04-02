import traceback

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import LoginSerializer, UserSerializer
from .models import User

class LoginView(APIView):
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response("Login con errores", status=status.HTTP_400_BAD_REQUEST)
        

class UserView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if not serializer.is_valid():
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
            instance = serializer.save()
            return Response({"message": f"Se registro con éxito el usuario {instance.name} {instance.last_name}!"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al crear usuario"}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, user_id):
        try:
            user = User.objects.filter(id=user_id)
            if not user.exists():
                return Response({"message": f"No existe el usuario solicitado!"}, status=status.HTTP_204_NO_CONTENT)
            
            user.first().delete()
            return Response({"error": f"Se elimino el usuario solicitado!"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Login con errores"}, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        try:
            users = User.objects.all()
            if not users.exists():
                return Response(f"No existen usuarios cargados!", status=status.HTTP_204_NO_CONTENT)
            
            print(users)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response("Error al obtener usuarios!", status=status.HTTP_400_BAD_REQUEST)
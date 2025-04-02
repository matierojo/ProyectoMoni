import traceback
from datetime import datetime
from dateutil.relativedelta import relativedelta

from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Loan
from .serializers import ApplicantSerializer, LoanInstallmentSerializer, LoanSerializer, LoanSimulationSerializer, LoanPaidSerializer

class LoanView(APIView):
    def get(self, request):
        try:
            loans = Loan.objects.all()
            if not loans:
                return Response({"message": "No existen Prestamos para mostrar"}, status=status.HTTP_204_NO_CONTENT)
            
            serializer = LoanSerializer(loans, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)                
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al obtener Prestamos!"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            with transaction.atomic():
                applicant_instance = None
                if "applicant" in request.data.keys() and request.data['applicant'] is not None:
                    applicant_serializer = ApplicantSerializer(data=request.data['applicant'])
                    
                    if not applicant_serializer.is_valid():
                        print("error", applicant_serializer.errors)
                        return Response({"error": "Error al cargar el solicitante del Préstamo"}, status=status.HTTP_400_BAD_REQUEST)
                    
                    applicant_instance = applicant_serializer.save()

                data_loan = request.data.copy()
                data_loan.pop("applicant")
                data_loan['loan_applicant'] = applicant_instance.id if applicant_instance else None

                loan_serializer = LoanSerializer(data=data_loan)
                
                if not loan_serializer.is_valid():
                    return Response(loan_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
                loan_instance = loan_serializer.save()
                
                amount_installment = loan_instance.total_amount / loan_instance.number_installments
                for number_installment in range(1, loan_instance.number_installments+1):
                    data_installment = {
                        "loan": loan_instance.id,
                        "number": number_installment,
                        "amount": amount_installment,
                        "expiration_date": datetime.now() + relativedelta(months=number_installment)
                    }
                    
                    installments_serializer = LoanInstallmentSerializer(data=data_installment)

                    if not installments_serializer.is_valid():
                        print(installments_serializer.errors)
                        return Response({"error": "Error al cargar las cuotas del Préstamo"}, status=status.HTTP_400_BAD_REQUEST)
                    
                    installments_serializer.save()
                return Response({"message": "Préstamo creado con éxito!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al crear préstamo!"}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, loan_id):
        try:
            loan = Loan.objects.get(id=loan_id)
            
            loan.delete()
            
            return Response({"message": "Prestamo eliminado con éxito!"}, status=status.HTTP_200_OK)
        except Loan.DoesNotExist:
            return Response({"error": "El préstamo no existe"}, status=status.HTTP_400_BAD_REQUEST)         
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al eliminar el prestamo seleccionado!"}, status=status.HTTP_400_BAD_REQUEST)
        

class LoanUserView(APIView):
    def get(self, request, user_id):
        try:
            loans = Loan.objects.filter(user_id=user_id)
            if not loans:
                return Response({"message": "No existen Prestamos para mostrar"}, status=status.HTTP_204_NO_CONTENT)
            
            serializer = LoanSerializer(loans, many=loans)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Loan.DoesNotExist:
            return Response({"error": "El préstamo no existe"}, status=status.HTTP_400_BAD_REQUEST)         
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al eliminar el prestamo seleccionado!"}, status=status.HTTP_400_BAD_REQUEST)



class LoanPaidView(APIView):
    def put(self, request, loan_id):
        try:
            loan = Loan.objects.get(id=loan_id)
            
            serializer = LoanPaidSerializer(loan, data=request.data, partial=True)

            if not serializer.is_valid():
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
            instance = serializer.save()

            print("se pago??", instance.paid)

            return Response({"message": "Prestamo pagado!"}, status=status.HTTP_200_OK)                
        except Loan.DoesNotExist:
            return Response({"error": "El préstamo no existe"}, status=status.HTTP_400_BAD_REQUEST)         
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al marcar como pagado el prestamo seleccionado!"}, status=status.HTTP_400_BAD_REQUEST)
        

class LoanSimulationView(APIView):
    def post(self, request):
        try:
            serializer = LoanSimulationSerializer(data=request.data)
            if not serializer.is_valid():
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            print("data validada", serializer.validated_data)
            return Response(serializer.to_representation(serializer.validated_data), status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response({"error": "Error al simular prestamo!"}, status=status.HTTP_400_BAD_REQUEST)
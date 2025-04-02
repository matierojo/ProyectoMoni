from rest_framework import serializers

from .constantes import INTEREST_RATES, get_interest_rate
from .funciones import calculate_total_amount
from .models import Loan, LoanApplicant, LoanInstallment

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = "__all__"
    
    def to_internal_value(self, data):
        print("data a modificar", data)
        data['number_installments'] = int(data['number_installments'])
        data['amount'] = float(data['amount'])

        if "interest_rate" not in data.keys():
            data['interest_rate'] = get_interest_rate(data['number_installments'])
            if data['interest_rate'] == None:
                raise serializers.ValidationError({"error": "Momentaneamente no contamos con la cantidad de cuotas solicitada"})

        data['net_amount'] = data.pop("amount")
        data['total_amount'] = calculate_total_amount(data['net_amount'], data['interest_rate'])

        return super().to_internal_value(data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['holder'] = str(instance.get_holder())
        data['net_amount'] = round(data['net_amount'], 2)
        data['total_amount'] = round(data['total_amount'], 2)

        return data
    
class LoanPaidSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Loan
        fields = ['paid'] 

    # def update(self, instance, validated_data):
    #     instance.paid = validated_data.get("paid", instance.paid)
    #     instance.save()
    #     return instance
    
class LoanInstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanInstallment
        fields = "__all__"

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplicant
        fields = "__all__"


class LoanSimulationSerializer(serializers.Serializer):
    number_installments = serializers.IntegerField()
    amount = serializers.FloatField()

    def validate(self, data):
        if data['number_installments'] not in [installment for installment, _ in INTEREST_RATES]:
            raise serializers.ValidationError("Momentaneamente no contamos con la cantidad de cuotas solicitada!")
        
        return super().validate(data)
    
    def to_representation(self, instance):
        interest_rate = get_interest_rate(instance['number_installments'])
        total_amount = calculate_total_amount(instance['amount'], interest_rate)
        
        return {
            "number_installments": instance['number_installments'],
            "amount": instance['amount'],
            "interest_rate": interest_rate,
            "total_amount": total_amount,
        }
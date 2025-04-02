def calculate_total_amount(net_amount, interest_rate):
        """Calcula el monto total a pagar con los intereses."""
        return net_amount * (1 + interest_rate / 100)
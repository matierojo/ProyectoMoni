INTEREST_RATES = (
    (3, 30),
    (6, 50),
    (12, 80),
    (18, 100),
    (24, 130),
)

def get_interest_rate(number_installments):
    return dict(INTEREST_RATES).get(number_installments, None)
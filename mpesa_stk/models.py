from django.db import models

class MpesaRequest(models.Model):
    phone_number = models.CharField(max_length=18)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account_reference = models.CharField(max_length=50)
    transaction_desc = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)


class MpesaResponse(models.Model):
    request = models.ForeignKey(MpesaRequest, on_delete=models.CASCADE,related_name='responses')
    merchant_request_id = models.CharField(max_length=255)
    checkout_request_id = models.CharField(max_length=255)
    response_code = models.CharField(max_length=10)
    response_description = models.CharField()
    customer_message = models.CharField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"MPesa Response {self.checkout_request_id}"
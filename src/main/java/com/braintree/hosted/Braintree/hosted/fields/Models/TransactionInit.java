package com.braintree.hosted.Braintree.hosted.fields.Models;

import com.braintreegateway.TransactionRequest;

import java.math.BigDecimal;

public class TransactionInit {
    public TransactionRequest create(String nonceFromTheClient) {
        TransactionRequest request = new TransactionRequest()
                .amount(new BigDecimal("10.00"))
                .paymentMethodNonce(nonceFromTheClient)
                .options()
                .submitForSettlement(true)
                .done();

        return request;
    }
}

package com.braintree.hosted.Braintree.hosted.fields;

import com.braintreegateway.*;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;


import java.math.BigDecimal;

@RestController
public class DropInController {
    @PostMapping(path="/api/drop-in")
    public Transaction transactionInit(@RequestBody String nonce) {
        BigDecimal amount = new BigDecimal("10.00");

        String nonceObj = nonce;

        String arr[] = nonceObj.split(":");

        String nonceFromTheClient = arr[1].replaceAll("[{}\"]", "");

        BraintreeGateway gateway = new BraintreeGateway(
                Environment.SANDBOX,
                "your merchantid",
                "your public key",
                "your private key"
        );

        System.out.println("nonce: " + nonceFromTheClient);

        TransactionRequest request = new TransactionRequest()
                .amount(amount)
                .paymentMethodNonce(nonceFromTheClient)
                .options()
                    .submitForSettlement(true)
                    .done();

        Result<Transaction> result = gateway.transaction().sale(request);

        if(result.isSuccess()) {
            Transaction transaction = result.getTarget();
            return transaction;
        } else {
            for(ValidationError error : result.getErrors().getAllDeepValidationErrors()) {
                System.out.println(error.getAttribute());
                System.out.println(error.getCode());
                System.out.println(error.getMessage());
            }
            Transaction transaction = result.getTransaction();
            return transaction;
        }
    }

}

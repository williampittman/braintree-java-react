package com.braintree.hosted.Braintree.hosted.fields;

import com.braintree.hosted.Braintree.hosted.fields.Models.GetNonce;
import com.braintree.hosted.Braintree.hosted.fields.Models.TransactionInit;
import com.braintreegateway.*;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CreateTransaction {



    @PostMapping(path="/api/create")
    public Result<Transaction> getNonce(@RequestBody String nonce) {

                GetNonce obtainNonce = new GetNonce();
                String nonceObj = nonce;

                String arr[] = nonceObj.split(":");

                String nonceFromTheClient = arr[1].replaceAll("[{}\"]", "");
                System.out.println(nonceFromTheClient);
                BraintreeGateway gateway = new BraintreeGateway(
                Environment.SANDBOX,
                "your merchant id",
                "your public key",
                "your private key"
        );
        TransactionInit createTransaction = new TransactionInit();

        Result<Transaction> result = gateway.transaction().sale(createTransaction.create(nonceFromTheClient));
        if(result.isSuccess()) {
            //return new ResponseEntity<Result>(result, HttpStatus.OK);
            return result;
        } else {
            for(ValidationError error : result.getErrors().getAllDeepValidationErrors()) {
                System.out.println(error.getAttribute());
                System.out.println(error.getCode());
                System.out.println(error.getMessage());
            }
            return result;
        }

        //return result;
    }


}

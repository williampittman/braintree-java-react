package com.braintree.hosted.Braintree.hosted.fields;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.ClientTokenRequest;
import com.braintreegateway.Environment;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    @PostMapping(path = "/api/tokenize")
    public String tokenize(Model model) {
        BraintreeGateway gateway = new BraintreeGateway(
                Environment.SANDBOX,
                "bzbbncx5d3dcgtsx",
                "n6wj69wvs9mz8m3y",
                "d5589091f11b609ee6f969a7a875c455"
        );

        ClientTokenRequest clientTokenRequest = new ClientTokenRequest();
        String clientToken = gateway.clientToken().generate(clientTokenRequest);

        return clientToken;
    }

}

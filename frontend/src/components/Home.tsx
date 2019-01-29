import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import { Container } from "reactstrap";

//components
import InputForm from "../components/InputForm";

//braintree
const client = require("braintree-web");
const hostedFields = require("braintree-web/hosted-fields");

interface IState {
  loading: boolean;
}

function Home({  }: RouteComponentProps) {
  return (
    <div>
      <Container>
        <h1 className="mt-5">Braintree Hosted Fields</h1>
        <InputForm authCode="sandbox_z7s9rx65_bzbbncx5d3dcgtsx" />
      </Container>
    </div>
  );
}

export default Home;

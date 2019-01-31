import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import { Container } from "reactstrap";

import SetUpDropIn from "../components/SetUpDropIn";

function DropIn({  }: RouteComponentProps) {
  return (
    <div>
      <Container>
        <h1 className="mt-5">Brainree Drop-in UI</h1>
        <SetUpDropIn authCode="sandbox_z7s9rx65_bzbbncx5d3dcgtsx" />
      </Container>
    </div>
  );
}

export default DropIn;

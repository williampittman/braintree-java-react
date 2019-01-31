import * as React from "react";
import { Button } from "react-bootstrap";

import axios from "axios";

let dropin = require("braintree-web-drop-in");

//components
import List from "./ListGroup";
import PayPalData from "./PayPalData";

interface IState {
  transID: string;
  statusHistory: Array<any>;
  payPalDetails: Object;
  hidden: boolean;
}

interface IProps {
  authCode: string;
}

class SetUpDropIn extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      transID: "",
      statusHistory: [],
      payPalDetails: {},
      hidden: false
    };
  }

  componentDidMount() {
    dropin.create(
      {
        authorization: this.props.authCode,
        container: "#dropin-container",
        paypal: {
          flow: "checkout",
          amount: "10.00",
          currency: "USD"
        },
        paypalCredit: {
          flow: "checkout",
          amount: "10.00",
          currency: "USD"
        },
        venmo: {
          allowNewBrowserTab: false
        }
      },
      (createErr: any, instance: any) => {
        if (createErr) {
          console.log(createErr);
        } else {
          let button: any = document.getElementById("submit-button");
          button.addEventListener("click", () => {
            instance
              .requestPaymentMethod()
              .then((payload: any) => {
                console.log(payload);
                axios
                  .post("/api/drop-in", {
                    nonce: payload.nonce
                  })
                  .then((response: any) => {
                    console.log(response.data);
                    if (!response.data.payPalDetails) {
                      console.log("CREDIT CARD");
                      this.setState({
                        transID: response.data.id,
                        statusHistory: response.data.statusHistory,
                        hidden: true
                      });
                    } else {
                      console.log("PAYPAL");
                      this.setState({
                        transID: response.data.id,
                        payPalDetails: response.data.payPalDetails,
                        hidden: true
                      });
                    }
                  });
              })
              .catch((requestPaymentMethodErr: any) => {
                console.log(requestPaymentMethodErr);
                instance.clearSelectedPaymentMethod();
                let errorDiv: any = document.getElementById("errorMessageDiv");
                errorDiv.textContent = `Transaction Failed: ${requestPaymentMethodErr}`;
              });
          });
        }
      }
    );
  }

  displayData(statusHistory: Array<any>, payPalDetails: Object) {
    if (
      this.state.hidden &&
      statusHistory &&
      Object.keys(payPalDetails).length == 0
    ) {
      return (
        <List statusHistory={statusHistory} transID={this.state.transID} />
      );
    } else if (this.state.hidden && Object.keys(payPalDetails).length > 0) {
      return (
        <PayPalData
          payPalDetails={payPalDetails}
          transID={this.state.transID}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.displayData(this.state.statusHistory, this.state.payPalDetails)}
          <div
            id="dropin-container"
            style={{ visibility: this.state.hidden ? "hidden" : "visible" }}
          />
          <div id="errorMessageDiv" />
          <Button color="success" id="submit-button">
            Submit Payment
          </Button>
        </div>
      </div>
    );
  }
}

export default SetUpDropIn;

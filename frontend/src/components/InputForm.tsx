"use strict";
import * as React from "react";

let braintree = require("braintree-web/client");
let hostedFields = require("braintree-web/hosted-fields");

import axios from "axios";

import List from "./ListGroup";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card
} from "reactstrap";
import { create } from "domain";

interface IState {
  ccNum: Number;
  cvv: string;
  exp: string;
  hostedFieldsInstance: any;
  hidden: boolean;
  statusHistory: Array<any>;
  transID: string;
}

interface IProps {
  authCode: string;
}

class InputForm extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.tokenize = this.tokenize.bind(this);
    //this.create = this.create.bind(this);

    this.state = {
      ccNum: 0,
      cvv: "",
      exp: "",
      hostedFieldsInstance: "",
      hidden: false,
      statusHistory: [],
      transID: ""
    };
  }

  handleChange(e: any) {
    this.setState({
      ccNum: e.target.value,
      cvv: e.target.value,
      exp: e.target.value
    });
  }

  componentDidMount() {
    let form = document.querySelector("#hostedForm");
    let submit = document.querySelector("#hostedSubmit");

    braintree
      .create({
        authorization: this.props.authCode
      })
      .then((clientInstance: any) => {
        let options = {
          client: clientInstance,
          styles: {
            input: {
              "font-size": "18px",
              color: "white"
            },
            "input.invalid": {
              color: "red"
            },
            "input.valid": {
              color: "green"
            }
          },
          fields: {
            number: {
              selector: "#ccNumHosted",
              placeholder: "4111 1111 1111 1111"
            },
            cvv: {
              selector: "#cvvHosted",
              placeholder: "123"
            },
            expirationDate: {
              selector: "#expHosted",
              placeholder: "12/2022"
            }
          }
        };
        return hostedFields.create(options);
      })
      .then((hostedFieldsInstance: any) => {
        this.setState({
          hostedFieldsInstance: hostedFieldsInstance
        });
      })
      .catch((hostedFieldsErr: any) => console.log(hostedFieldsErr));
  }

  displayData(statusHistory: Array<any>) {
    if (this.state.hidden) {
      return (
        <List statusHistory={statusHistory} transID={this.state.transID} />
      );
    }
  }

  tokenize(event: any) {
    event.preventDefault();
    let hostedFieldsInstance = this.state.hostedFieldsInstance;
    hostedFieldsInstance.tokenize((tokenizeErr: any, payload: any) => {
      if (tokenizeErr) {
        console.log(tokenizeErr);
      } else {
        axios
          .post("/api/create", {
            nonce: payload.nonce
          })
          .then(response => {
            console.log(response.data);
            const transID = response.data.target.id;
            const statusHistory = response.data.target.statusHistory;

            this.setState({ hidden: true, statusHistory, transID });

            this.displayData(statusHistory);
          })
          .catch(err => console.log(err));
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.displayData(this.state.statusHistory)}
          <Col md={6}>
            <Card
              className="mt-5"
              body
              inverse
              style={{
                backgroundColor: "#333",
                borderColor: "#333",
                visibility: this.state.hidden ? "hidden" : "visible"
              }}
            >
              <Form id="hostedForm" onSubmit={this.tokenize}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="ccNum"> Card Number</Label>
                      <div id="ccNumHosted" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cvv">CVV</Label>
                      <div id="cvvHosted" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exp">Exp</Label>
                      <div id="expHosted" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Button id="hostedSubmit" color="secondary" block>
                      Pay!
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </div>
      </div>
    );
  }
}

export default InputForm;

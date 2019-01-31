import * as React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";

interface IProps {
  payPalDetails: Object;
  transID: string;
}

class PayPalData extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let count = 0;

    let payPalData = this.props.payPalDetails;
    return (
      <ListGroup>
        <ListGroupItem key={count++}>
          BT trx id: {this.props.transID}
        </ListGroupItem>
        <ListGroupItem key={count++}>
          PP trx id: {payPalData["captureId"]}
        </ListGroupItem>
        <ListGroupItem key={count++}>{payPalData["payerEmail"]}</ListGroupItem>
      </ListGroup>
    );
  }
}

export default PayPalData;

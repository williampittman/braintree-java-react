import * as React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";

interface IProps {
  statusHistory: Array<any>;
  transID: string;
  payPalDetails?: Object;
}

class List extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let statusHistory = this.props.statusHistory;
    let count = 0;
    let data: any[] = [];
    data.push(statusHistory[1]);
    console.log(data);
    let outputData = data.map(index => (
      <div key={this.props.transID}>
        <ListGroupItem key={count++}>
          Transaction {this.props.transID}
        </ListGroupItem>
        <ListGroupItem key={count++}>Total: ${index.amount}</ListGroupItem>
        <ListGroupItem key={count++}>{index.status}</ListGroupItem>
        <ListGroupItem key={count++}>{index.timestamp}</ListGroupItem>
        <ListGroupItem key={count++}>Paid to: {index.user}</ListGroupItem>
      </div>
    ));

    return <ListGroup>{outputData}</ListGroup>;
  }
}

export default List;

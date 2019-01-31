import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { string } from "prop-types";
import { Router, Link, RouteComponentProps } from "@reach/router";
import { render } from "react-dom";
import PropTypes from "prop-types";

const braintree = require("braintree-web/client");
//material-ui

//reactstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { Spinner } from "../node_modules/reactstrap/lib/Spinner";
//components
import Spin from "./components/Loading";
//routes
let Home = React.lazy(() => import("./components/Home"));

let DropIn = React.lazy(() => import("./components/DropIn"));

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

interface IProps {}

interface IState {
  collapsed: boolean;
}

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" className="navbar-dark bg-dark" dark>
          <NavbarBrand href="/" className="mr-auto">
            Braintree Example
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Hosted Fields</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="DropIn">Drop-in UI</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <React.Suspense fallback={<Spin />}>
          <Router>
            <Home path="/" />
            <DropIn path="DropIn" />
          </Router>
        </React.Suspense>
      </div>
    );
  }
}

export default App;

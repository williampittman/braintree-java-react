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
//components

//routes
let Home = React.lazy(() => import("./components/Home"));
let Dash = React.lazy(() => import("./components/Dash"));

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
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="dashboard">Dashboard</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <React.Suspense fallback={<h2>TODO: Spinner</h2>}>
          <Router>
            <Home path="/" />
            <Dash path="dashboard" />
          </Router>
        </React.Suspense>
      </div>
    );
  }
}

export default App;

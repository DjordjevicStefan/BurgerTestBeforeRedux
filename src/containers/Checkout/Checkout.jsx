import React, { Component } from "react";

import { Route } from "react-router-dom";

import styles from "./Checkout.module.css";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import Spinner from "../../components/Ui/Spinner/Spinner";

import query from "query-string";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice : null ,
    load: false
  };

  componentDidMount() {
    console.log("jebem ti mater" , this.props.location.state);
    
    this.setState({
      ingredients: query.parse(this.props.location.search),
      totalPrice : this.props.location.state ,
      load: true
    });
  }

  handleCheckoutCancel = () => {
    this.props.history.push("/");
  };

  handleCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkout = null;
    if (this.state.load) {
      checkout = (
        <> 
          
          <CheckoutSummary
            cancelOrder={this.handleCheckoutCancel}
            continueOrder={this.handleCheckoutContinue}
            ingredients={this.state.ingredients}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={(props) => <ContactData {...props} totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} />}
          />
        </>
      );
    } else {
      checkout = <Spinner />;
    }

    return (
      <div>
        {checkout}
        {/* {console.log("lokacija stizanja do ovde", this.props)} */}
      </div>
    );
  }
}

export default Checkout;

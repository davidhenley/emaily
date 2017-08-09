import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleToken } from '../actions';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 credits"
        token={this.props.handleToken}
        amount={500}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleToken })(Payments);

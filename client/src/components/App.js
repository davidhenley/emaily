import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';

// Dummy components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);

import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
  state = {
    showReview: false
  }

  renderContent() {
    if (this.state.showReview) {
      return (
        <SurveyReview
          onCancel={() => this.setState({ showReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// Only here to destroy form values on unmount
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);

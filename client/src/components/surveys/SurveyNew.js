import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
  state = {
    showReview: false
  }

  renderContent() {
    if (this.state.showReview) {
      return <SurveyReview />;
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

export default SurveyNew;

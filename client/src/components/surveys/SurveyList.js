import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.map((survey, i) => {
      return (
        <div className="card darken-1" key={i}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.from}</p>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a href="#">Yes: {survey.yes}</a>
            <a href="#">No: {survey.no}</a>
            <a href="#" onClick={() => this.props.deleteSurvey(survey._id)} className="right">Delete</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);

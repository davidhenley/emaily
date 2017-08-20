import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { sendSurvey } from '../../actions';

const SurveyReview = ({ onCancel, values, sendSurvey }) => {
  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{values[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        onClick={onCancel}
        className="yellow white-text darken-3 btn-flat"
      >Back</button>
      <button
        className="green white-text btn-flat right"
        onClick={() => sendSurvey(values)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

const mapStateToProps = ({ form }) => ({ values: form.surveyForm.values });

export default connect(mapStateToProps, { sendSurvey })(SurveyReview);

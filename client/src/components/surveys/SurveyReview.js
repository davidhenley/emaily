import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';

const SurveyReview = ({ onCancel, values }) => {
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
        className="yellow darken-3 btn-flat"
      >Back</button>
    </div>
  );
}

const mapStateToProps = ({ form }) => ({ values: form.surveyForm.values });

export default connect(mapStateToProps)(SurveyReview);

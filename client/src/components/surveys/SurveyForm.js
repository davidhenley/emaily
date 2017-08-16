import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' }
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ name, label }, i) => (
      <Field type="text" name={name} label={label} component={SurveyField} key={i} />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(vals => console.log(vals))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);

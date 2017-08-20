import React from 'react';

const SurveyReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <button
        onClick={onCancel}
        className="yellow darken-3 btn-flat"
      >Back</button>
    </div>
  );
}

export default SurveyReview;

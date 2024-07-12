import React from "react";

const Feedback = ({ values, total, positive }) => {
  return (
    <ul>
      <li>Good: {values.good}</li>
      <li>Neutral: {values.neutral}</li>
      <li>Bad: {values.bad}</li>
      <li>Total: {total}</li>
      <li>Positive: {positive} %</li>
    </ul>
  );
};
export default Feedback;

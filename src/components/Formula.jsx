import React from "react";

const Formula = ({ values, total, positive }) => {
  return (
    <ul>
      <li>Weight: {values.weight}</li>
      <li>sportTime: {values.sportTime}</li>
      <li>Bad: {values.bad}</li>
      <li>Total: {total}</li>
      <li>Positive: {positive} %</li>
    </ul>
  );
};
export default Formula;

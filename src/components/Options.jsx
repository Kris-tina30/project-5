import React from "react";

const Options = ({ updateFormula, onReset, total, isVisibleButton }) => {
  return (
    <div>
      <button onClick={() => updateFormula("weight")}>Weight</button>
      <button onClick={() => updateFormula("sportTime")}>sportTime</button>
      <button onClick={() => updateFormula("bad")}>Bad</button>
      {total !== 0 && <button onClick={onReset}>Reset</button>}
    </div>
  );
};

export default Options;

import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
// import Formula from "./components/Formula";
// import Options from "./components/Options";
// import Notification from "./components/Notification";
import Description from "./components/Description";
import UserSettingsForm from "./components/UserSettingsForm";
import Header from "./components/Header";

function App() {
  // const initialValues = {
  //   weight: 0,
  //   sportTime: 0,
  // };

  // const [values, setValues] = useState(() => {
  //   const stringifiedValues = localStorage.getItem("formulaValues");
  //   const parsedValues = JSON.parse(stringifiedValues) ?? initialValues;
  //   return parsedValues;
  // });

  const [isVisibleButton, setIsVisibleButton] = useState(false);

  // const updateFormula = (formulaType) => {
  //   setValues({ ...values, [formulaType]: values[formulaType] + 1 });
  //   setIsVisibleButton(true);
  // };

  // const totalFormula = values.weight + values.sportTime + values.bad;
  // const positive = Math.round(
  //   ((values.weight + values.sportTime) / totalFormula) * 100
  // );

  const handleResetButton = () => {
    setValues(initialValues);
    setIsVisibleButton(false);
  };

  // useEffect(() => {
  //   localStorage.setItem("formulaValues", JSON.stringify(values));
  // }, [values]);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleUpdate = (data) => {};

  return (
    <>
      <Header />
      <Description />
      <button onClick={handleOpenModal}>Setting</button>
      <UserSettingsForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />

      {/* <Options
        updateFormula={updateFormula}
        onReset={handleResetButton}
        total={totalFormula}
        isVisibleButton={isVisibleButton}
      />
      {totalFormula > 0 ? (
        <Formula values={values} total={totalFormula} positive={positive} />
      ) : (
        <Notification />
      )} */}
    </>
  );
}

export default App;

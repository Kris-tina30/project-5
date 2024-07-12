import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Feedback from "./components/Feedback";
import Options from "./components/Options";
import Notification from "./components/Notification";
import Description from "./components/Description";
import UserSettingsForm from "./components/UserSettingsForm";

function App() {
  const initialValues = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [values, setValues] = useState(() => {
    const stringifiedValues = localStorage.getItem("feedbackValues");
    const parsedValues = JSON.parse(stringifiedValues) ?? initialValues;
    return parsedValues;
  });

  const [isVisibleButton, setIsVisibleButton] = useState(false);

  const updateFeedback = (feedbackType) => {
    setValues({ ...values, [feedbackType]: values[feedbackType] + 1 });
    setIsVisibleButton(true);
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positive = Math.round(
    ((values.good + values.neutral) / totalFeedback) * 100
  );

  const handleResetButton = () => {
    setValues(initialValues);
    setIsVisibleButton(false);
  };

  useEffect(() => {
    localStorage.setItem("feedbackValues", JSON.stringify(values));
  }, [values]);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleUpdate = (data) => {};
  // Оновіть дані у UserPanel, WaterDailyNorma, WaterProgressBar, WaterList та Calendar

  return (
    <>
      <Description />
      <button onClick={handleOpenModal}>Edit User Settings</button>
      <UserSettingsForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />

      {/* <Options
        updateFeedback={updateFeedback}
        onReset={handleResetButton}
        total={totalFeedback}
        isVisibleButton={isVisibleButton}
      />
      {totalFeedback > 0 ? (
        <Feedback values={values} total={totalFeedback} positive={positive} />
      ) : (
        <Notification />
      )} */}
    </>
  );
}

export default App;

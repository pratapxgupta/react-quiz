import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col item-center gap-4">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline">Instructions</h1>
        <li>Exam must be Completed in {examData.duration} seconds</li>
        <li>Once Submitted, You Cannot Change Your Answers.</li>
        <li>
          Exam will be Submitted automatically after {examData.duration} seconds
        </li>
        <li>Do not Refresh the Page.</li>
        <li>
          You can use the <span className="font-bold">'Previous'</span> and{" "}
          <span className="font-bold">'Next'</span> Buttons to navigate Between
          Questions.
        </li>
        <li>
          Total Marks of the Exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li>
          Passing Marks of the Exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>
      <div className="flex gap-2">
        <button className="primary-outlined-btn" onClick={() => navigate("/")}>
          Close
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;

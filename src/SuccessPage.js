import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="text-center text-red-600 mt-10">No data found. Please fill the form first.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Form Submitted Successfully!</h2>
      <ul className="space-y-2 text-gray-700">
        {Object.entries(state).map(([key, val]) => (
          <li key={key}>
            <strong>{key}:</strong> {val}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate("/")}
        className="mt-6 block mx-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default SuccessPage;

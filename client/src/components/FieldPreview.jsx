// components/FieldPreview.js
import React from "react";

const FieldPreview = ({ field }) => {
  const renderInput = () => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            className="border border-gray-300 bg-white p-2 rounded"
          />
        );
      case "number":
        return (
          <input
            type="number"
            className="border border-gray-300 bg-white p-2 rounded"
          />
        );
      case "email":
        return (
          <input
            type="email"
            className="border border-gray-300 bg-white p-2 rounded"
          />
        );
      case "password":
        return (
          <input
            type="password"
            className="border border-gray-300 bg-white p-2 rounded"
          />
        );
      case "textarea":
        return (
          <textarea
            className="border border-gray-300 bg-white p-2 rounded"
            rows={3}
          />
        );
      case "radio":
        return field.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={field.name}
              value={option}
              className="mr-2 bg-white"
            />
            <label>{option}</label>
          </div>
        ));
      case "checkbox":
        return field.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              name={field.name}
              value={option}
              className="mr-2 bg-white"
            />
            <label>{option}</label>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-bold mb-2">{field.name}</label>
      {renderInput()}
    </div>
  );
};

export default FieldPreview;

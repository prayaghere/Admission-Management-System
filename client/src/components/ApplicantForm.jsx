// components/FormPreviewModal.js
import React from "react";
import FieldPreview from "./FieldPreview";

const ApplicantForm = ({ form }) => {
  // Helper function to parse field details from the string
  const parseFieldDetails = (fieldString) => {
    const [name, type, ...options] = fieldString.split(":");
    return { name, type, options: options.join(":").split(",") };
  };

  return (
    <div className="bg-white p-6 rounded-lg overflow-y-auto">
      <div className="flex"></div>
      {form.fields.map((fieldString, index) => {
        const fieldDetails = parseFieldDetails(fieldString);
        return (
          <div key={index} className="mb-4">
            <FieldPreview field={fieldDetails} />
          </div>
        );
      })}
    </div>
  );
};

export default ApplicantForm;

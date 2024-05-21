// components/FormPreviewModal.js
import React from "react";
import FieldPreview from "./FieldPreview";
import { IoIosCloseCircleOutline } from "react-icons/io";

const FormPreviewModal = ({ form, onClose }) => {
  // Helper function to parse field details from the string
  const parseFieldDetails = (fieldString) => {
    const [name, type, ...options] = fieldString.split(":");
    return { name, type, options: options.join(":").split(",") };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 w-screen mt-10">
      <div className="bg-white p-6 rounded-lg  h-96 overflow-y-auto">
        <div className="flex">
          <h2 className="text-xl font-bold mb-4">{form.title}</h2>
          <button
            className="text-red-500 shadow-none border-none bg-primaryText ml-auto"
            onClick={onClose}
          >
            <IoIosCloseCircleOutline />
          </button>
        </div>
        {form.fields.map((fieldString, index) => {
          const fieldDetails = parseFieldDetails(fieldString);
          return (
            <div key={index} className="mb-4">
              <FieldPreview field={fieldDetails} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormPreviewModal;

import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as XLSX from "xlsx"; // Import xlsx library
import { Button } from "./ui/button";
import moment from "moment";
const SubmissionModal = ({ submissions, onClose, formId }) => {
  const handleDownload = () => {
    // Convert submissions data to a format suitable for Excel
    const worksheetData = submissions.map((submission) => ({
      "Submission ID": submission._id,
      ...submission.fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {}),
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    // Generate an Excel file and initiate download
    XLSX.writeFile(workbook, `submissions_${formId}.xlsx`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full h-96 overflow-y-auto">
        <div className="flex justify-end mt-4">
          <button
            className=" text-red-500 shadow-none border-none bg-primaryText ml-auto"
            onClick={onClose}
          >
            <IoIosCloseCircleOutline />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">
          Submissions for Form ID: {formId}
        </h2>
        <div className="flex justify-end mb-4">
          <Button
            className="bg-primaryText text-white border-none focus:outline-none "
            onClick={handleDownload}
          >
            Download Data
          </Button>
        </div>
        <div className="overflow-auto max-h-96">
          {submissions.map((submission) => (
            <div key={submission._id} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Submission ID: {submission._id}
              </h3>
              <ul>
                {submission.fields.map((field) => (
                  <li key={field._id}>
                    <span className="font-semibold">{field.name}: </span>
                    {field.value}
                  </li>
                ))}
              </ul>
              <p>
                <b>Submission Time:</b>{" "}
                {moment(submission.createdAt).format("Do MMMM YYYY, h:mm a")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;

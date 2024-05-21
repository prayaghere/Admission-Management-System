import React, { useState } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import FieldPreview from "../../components/FieldPreview";
import { useToast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "@/components/ui/input";
const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fields, setFields] = useState([]);
  const { toast } = useToast();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "text", options: [] }]);
  };

  const handleFieldChange = (index, e) => {
    const updatedFields = [...fields];
    updatedFields[index][e.target.name] = e.target.value;
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, e) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = e.target.value;
    setFields(updatedFields);
  };

  const handleAddOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    try {
      // Serialize fields data into an array of strings
      const serializedFields = fields.map(
        (field) => `${field.name}:${field.type}:${field.options.join(",")}`
      );
      const response = await axios.post(`${baseURL}/${"form/createForm"}`, {
        title,
        endDate,
        fields: serializedFields,
      });
      console.log(response.data);
      toast({
        title: "Form added successfully",
      });
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error creating form:", error.response.data);
      // Handle error (e.g., show an error message)
      toast({
        variant: "destructive",
        title: "Error in adding form",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-1 p-4 md:p-8 pt-6 mt-5 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
        <div>
          <div className="flex justify-between items-center mb-4 mt-10">
            <h1 className="text-3xl font-bold text-primaryText">Create Form</h1>
            <Button
              className="bg-primaryText text-white border-none focus:outline-none ml-auto"
              onClick={handleFormSubmit}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                "Submit Form"
              )}
            </Button>
          </div>
          <Separator className="mb-5" />
          <h3 className="font-bold text-xl text-primaryText mb-2">Title</h3>
          <Input
            type="text"
            placeholder="Enter Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mr-3 mb-2"
            disabled={loading}
          />
          <h3 className="font-bold text-xl text-primaryText mb-2">
            Form End Date
          </h3>
          <Input
            type="date"
            placeholder="Enter End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mr-3 mb-2"
            disabled={loading}
          />

          <div className="flex lg:flex-row flex-col border p-3 mt-2">
            <div>
              <h2 className="font-bold text-primaryText text-xl mb-2">
                Form Fields
              </h2>
              {fields.map((field, index) => (
                <div key={index} className="mb-2 mr-3">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Field Name"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, e)}
                    disabled={loading}
                  />
                  <select
                    name="type"
                    value={field.type}
                    onChange={(e) => handleFieldChange(index, e)}
                    disabled={loading}
                    className="bg-white"
                  >
                    <option value="text" className="bg-white">
                      Text
                    </option>
                    <option value="number" className="bg-white">
                      Number
                    </option>
                    <option value="radio" className="bg-white">
                      Radio
                    </option>
                    <option value="checkbox" className="bg-white">
                      Checkbox
                    </option>
                    <option value="email" className="bg-white">
                      Email
                    </option>
                    <option value="password" className="bg-white">
                      Password
                    </option>
                    <option value="textarea" className="bg-white">
                      Textarea
                    </option>
                  </select>
                  {(field.type === "radio" || field.type === "checkbox") && (
                    <>
                      {field.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <input
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, optionIndex, e)
                            }
                            disabled={loading}
                            className="bg-white"
                          />
                        </div>
                      ))}
                      <Button
                        className="bg-primaryText text-white border-none focus:outline-none ml-1 mb-2 mt-2"
                        onClick={() => handleAddOption(index)}
                        disabled={loading}
                      >
                        Add Option
                      </Button>
                    </>
                  )}
                </div>
              ))}
              <Button
                className="bg-primaryText text-white border-none focus:outline-none"
                onClick={handleAddField}
                disabled={loading}
              >
                Add Field
              </Button>
            </div>
            <div className=" ml-auto border p-3 mt-5">
              <h2 className="text-xl text-primaryText font-bold mb-2">
                Form Preview
              </h2>
              {fields.map((field, index) => (
                <div key={index} className="mb-4">
                  <FieldPreview field={field} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

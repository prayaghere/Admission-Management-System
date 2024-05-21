import React, { useState, useEffect } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components//ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
const FillForm = () => {
  const userid = localStorage.getItem("userId");
  const [postedForm, setPostedForm] = useState(null);
  const [formId, setFormId] = useState(null);
  const [formData, setFormData] = useState({ id: userid });
  const { toast } = useToast();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    const fetchPostedForm = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/${"postedform/getPostedForm"}`
        );
        setPostedForm(response.data.postedForm);
        setFormId(response.data.postedForm.formData._id);
        setEndDate(response.data.postedForm.formData.endDate);
      } catch (error) {
        console.error("Error fetching posted form:", error);
      }
    };

    fetchPostedForm();
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const fields = Object.entries(formData).map(([name, value]) => ({
        name,
        value,
      }));

      const submissionData = {
        formId: formId,
        fields: fields,
      };

      const response = await axios.post(
        `${baseURL}/${"applicants/submit"}`,
        submissionData
      );
      toast({
        title: "Data registered Successfully",
      });
      console.log(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error in entering data",
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseFieldDetails = (fieldString) => {
    const [name, type, ...options] = fieldString.split(":");
    return { name, type, options: options.join(":").split(",") };
  };

  if (!postedForm) {
    return <div>Loading...</div>;
  }
  const currentDate = moment().format("YYYY/MM/DD");
  console.log(currentDate);
  console.log(endDate);
  if (moment(currentDate).isAfter(moment(endDate))) {
    return (
      <div className="text-red-500 md:ml-40 mt-20">Admissions are Closed</div>
    );
  }

  return (
    <div>
      <div className="flex-1 p-4 md:p-8 pt-6 mt-5 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
        <div>
          <div className="flex justify-between items-center mb-4 mt-10">
            <h1 className="text-3xl font-bold text-primaryText">
              Application Form
            </h1>
          </div>
          <Separator className="mb-5" />
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#123abc" loading={loading} size={50} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {postedForm.formData.fields.map((fieldString, index) => {
                const { name, type, options } = parseFieldDetails(fieldString);
                let inputElement = null;

                switch (type) {
                  case "text":
                    inputElement = (
                      <Input
                        type="text"
                        name={name}
                        onChange={handleFieldChange}
                        className="w-72 bg-white"
                      />
                    );
                    break;
                  case "number":
                    inputElement = (
                      <Input
                        type="number"
                        name={name}
                        onChange={handleFieldChange}
                        className="w-72 bg-white"
                      />
                    );
                    break;
                  case "email":
                    inputElement = (
                      <Input
                        type="email"
                        name={name}
                        onChange={handleFieldChange}
                        className="w-72 bg-white"
                      />
                    );
                    break;
                  case "radio":
                    inputElement = options.map((option) => (
                      <Label key={option}>
                        <input
                          type="radio"
                          name={name}
                          value={option}
                          onChange={handleFieldChange}
                          className="w-7 bg-white accent-blue-500"
                        />
                        <Label> {option}</Label>
                      </Label>
                    ));
                    break;
                  case "checkbox":
                    inputElement = options.map((option) => (
                      <Label key={option}>
                        <input
                          type="checkbox"
                          name={name}
                          value={option}
                          onChange={handleFieldChange}
                          className="w-7 bg-green accent-blue-500"
                        />
                        {option}
                      </Label>
                    ));
                    break;
                  case "textarea":
                    inputElement = options.map((option) => (
                      <Label key={option}>
                        <textarea
                          name={name}
                          onChange={handleFieldChange}
                          className="border border-gray-300 bg-white p-2 rounded"
                          rows={3}
                        />
                        {option}
                      </Label>
                    ));
                    break;
                  default:
                    inputElement = (
                      <Input
                        type="text"
                        name={name}
                        onChange={handleFieldChange}
                        className="bg-white"
                      />
                    );
                }

                return (
                  <div key={index} className="mb-4">
                    <Label>{name}</Label>
                    {inputElement}
                  </div>
                );
              })}
              <Button className="ml-6" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit Form"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillForm;

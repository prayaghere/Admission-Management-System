import React, { useState, useEffect } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import FormPreviewModal from "../../components/FormPreviewModal";
import { useToast } from "@/components/ui/use-toast";
import SubmissionModal from "../../components/Submissions";
import ClipLoader from "react-spinners/ClipLoader";
const CreatedForms = () => {
  const [forms, setForms] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewForm, setPreviewForm] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [postedFormId, setPostedFormId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role || "");
    setLoading(true);
    fetchForms();
    fetchPostedFormId();
    setLoading(false);
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(`${baseURL}/${"form/getAllForms"}`);
      setForms(response.data.forms);
    } catch (error) {
      console.error("Error fetching forms:", error.response.data);
    }
  };

  const fetchPostedFormId = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/${"postedform/getPostedForm"}`
      );
      setPostedFormId(
        response.data.postedForm ? response.data.postedForm._id : null
      );
    } catch (error) {
      console.error("Error fetching posted form:", error.response.data);
    }
  };

  const handleDeleteForm = async (id) => {
    try {
      const response = await axios.delete(
        `${baseURL}/${"form/deleteForm"}/${id}`
      );
      console.log(response.data);
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error.response.data);
    }
  };

  const handlePreviewForm = async (formId) => {
    try {
      const response = await axios.get(
        `${baseURL}/${"form/getForm"}/${formId}`
      );
      setPreviewForm(response.data.form);
      setShowPreview(true);
    } catch (error) {
      console.error("Error fetching form:", error.response.data);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPreviewForm(null);
  };

  const handlePostForm = async (formId) => {
    try {
      const form = forms.find((f) => f._id === formId);

      if (postedFormId) {
        await axios.patch(
          `${baseURL}/${"postedform/updatePostedForm"}/${postedFormId}`,
          { formData: form }
        );
        console.log("Posted form updated successfully");
      } else {
        const response = await axios.post(
          `${baseURL}/${"postedform/postForm"}`,
          { formData: form }
        );
        setPostedFormId(response.data.postedForm._id);
        console.log("Form posted successfully");
      }
      toast({
        title: "form posted successfully",
      });
    } catch (error) {
      console.error("Error posting or updating form:", error.response.data);
      toast({
        variant: "destructive",
        title: "error in posting form",
      });
    }
  };

  const handleShowSubmissions = async (formId) => {
    try {
      const response = await axios.get(
        `${baseURL}/${"applicants/submissions"}/${formId}`
      );
      setSubmissions(response.data);
      setSelectedFormId(formId);
      setShowSubmissions(true);
    } catch (error) {
      console.error("Error fetching submissions:", error.response.data);
    }
  };

  const handleCloseSubmissions = () => {
    setShowSubmissions(false);
    setSubmissions([]);
    setSelectedFormId(null);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <>
          <div className="flex-1 p-4 md:p-8 pt-6 mt-5 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
            <div>
              <div className="flex justify-between items-center mb-4 mt-10">
                <h1 className="text-3xl font-bold text-primaryText">Form</h1>
              </div>
              <Separator className="mb-5" />
              <div className="flex flex-wrap">
                {forms.map((form) => (
                  <Card key={form._id} className="m-3 p-3">
                    <CardTitle>{form.title}</CardTitle>
                    <div className="mt-3">
                      <Button
                        className="bg-green-500 text-white border-none focus:outline-none mr-3"
                        onClick={() => handlePreviewForm(form._id)}
                      >
                        Preview
                      </Button>
                      {userRole === "admin" || userRole === "headAdmin" ? (
                        <Button
                          className="bg-primaryText text-white border-none focus:outline-none mt-3 mr-3"
                          onClick={() => handlePostForm(form._id)}
                        >
                          Post
                        </Button>
                      ) : null}
                      {userRole === "admin" || userRole === "headAdmin" ? (
                        <Button
                          className="bg-red-500 text-white border-none focus:outline-none mr-3 mt-3"
                          onClick={() => handleDeleteForm(form._id)}
                        >
                          Delete
                        </Button>
                      ) : null}
                      {userRole === "admin" || userRole === "headAdmin" ? (
                        <Button
                          className="bg-green-800 text-white border-none focus:outline-none mt-3"
                          onClick={() => handleShowSubmissions(form._id)}
                        >
                          Submissions
                        </Button>
                      ) : null}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          {showPreview && (
            <FormPreviewModal form={previewForm} onClose={handleClosePreview} />
          )}
          {showSubmissions && (
            <SubmissionModal
              submissions={submissions}
              onClose={handleCloseSubmissions}
              formId={selectedFormId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CreatedForms;

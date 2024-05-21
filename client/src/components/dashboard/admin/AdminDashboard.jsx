import Overview from "../../Overview";
import RecentAdmins from "./RecentFormSetters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormSetters } from "@/services/headAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
// Main admin dashboard page
const AdminDashboard = () => {
  // Hardcoded values

  const [totalFormSetters, setTotalFormSetters] = useState(0);
  const [totalForm, setTotalForm] = useState(0);
  const [registeredApplicants, setRegisteredApplicants] = useState(0);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch total form setters from API
    const fetchData = async () => {
      try {
        const response = await getFormSetters(); // Call the getFormSetters service
        setTotalFormSetters(response.data.length); // Assuming response.data is an array of form setters
        const formResponse = await axios.get(
          `${baseURL}/${"form/getAllForms"}`
        );
        setTotalForm(formResponse.data.forms.length);
        const ApplicantResponse = await axios.get(
          `${baseURL}/${"applicants/all"}`
        );
        setRegisteredApplicants(ApplicantResponse.data.length);
      } catch (error) {
        console.error("Error fetching total form setters:", error);
      }
    };

    fetchData(); // Call fetchTotalFormSetters when component mounts
  }, []);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-950">
              Total Form Setters
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFormSetters}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-950">
              Total Forms
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalForm}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-950">
              Registered Applicants
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registeredApplicants}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-5 mb-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-indigo-950">
              FormSetter Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle className="text-indigo-950">
              Recent Added Form Setters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentAdmins />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/components/ui/use-toast";
import logo from "../../assets/logo.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const endpoint = "register"; // Example endpoint
    const fullURL = `${baseURL}/${endpoint}`;
    const data = { firstname, lastname, email, password };

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      await axios.post(fullURL, data);
      toast({
        title: "Registered successfully",
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error, e.g., show a toast notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                  <a
                    href="https://www.iiit-bh.ac.in/"
                    className="flex ms-2 md:me-24"
                  >
                    <img
                      src={logo}
                      className="h-8 me-3"
                      alt="IIIT BHubaneswar"
                    />
                  </a>
                </div>
                <Button
                  className=" bg-primaryText text-white border-none focus:outline-none rounded-xl"
                  onClick={() => navigate("/")}
                >
                  Go to Login
                </Button>
              </div>
            </div>
          </nav>
          <Card className="md:w-96">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Register Applicant
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full bg-primaryText text-white border-none focus:outline-none rounded-xl"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Register"}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default Register;

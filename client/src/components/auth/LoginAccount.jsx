import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loginUser } from "../../services/authService";
import { useToast } from "@/components/ui/use-toast";
import logo from "../../assets/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ERROR_LOGIN,
  HEAD_ADMIN_DASHBOARD_ENDPOINT,
  ADMIN_DASHBOARD_ENDPOINT,
} from "@/lib/constants/constant";
import { login, common } from "../../lib/constants/string.json";
import ClipLoader from "react-spinners/ClipLoader";

// Account login component
export default function LoginAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    loginUser({ email, password })
      .then((response) => {
        console.log(response);
        const { token, role, firstname, _id } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("userId", _id);

        if (role === common.roleHeadAdmin) {
          navigate(HEAD_ADMIN_DASHBOARD_ENDPOINT);
        } else if (role === common.roleAdmin) {
          navigate(ADMIN_DASHBOARD_ENDPOINT);
        } else if (role === common.roleFormSetter) {
          navigate("/formSetter/create-forms");
        } else if (role === common.roleApplicant) {
          navigate("/applicant/application-form");
        }

        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: ERROR_LOGIN,
        });
        console.error("Login failed:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#123abc" loading={isLoading} size={50} />
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
                    <img src={logo} className="h-8 me-3" alt="IIIT BHubaneswar" />
                  </a>
                </div>
                <Button
                  className=" bg-primaryText text-white border-none focus:outline-none rounded-xl"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </div>
            </div>
          </nav>
          <div className="w-full m-auto bg-white lg:max-w-lg">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  {login.loginHeader}
                </CardTitle>
                <CardDescription className="text-center">
                  {login.loginTitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">{login.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{login.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  className="w-full bg-primaryText text-white border-none focus:outline-none rounded-xl"
                  onClick={handleLogin}
                >
                  {login.loginHeader}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
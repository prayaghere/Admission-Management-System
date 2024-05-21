import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import ForbiddenPage from "./pages/ForbiddenPage";
import ProtectedRoute from "./routes/protectedRoutes";
import UserLayout from "./components/layout/UserLayout";
import HeadAdminDashboard from "./pages/headAdmin/HeadAdminDashboard";
import CreateAdmin from "./pages/admin/CreateAdmin";
import CreatedForms from "./pages/formSetter/CreatedForms";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateFormSetter from "./pages/formSetter/CreateFormSetter";
import CreateForm from "./pages/formSetter/CreateForm";
import FillForm from "./pages/applicant/FillForm";
import FilledForm from "./pages/applicant/FilledForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/restricted" element={<ForbiddenPage />} />
        {/* routes for head admins */}
        <Route
          path="/headAdmin/*"
          element={
            <ProtectedRoute allowedRoles={["headAdmin"]}>
              <UserLayout>
                <Routes>
                  <Route path="/dashboard" element={<HeadAdminDashboard />} />
                  <Route path="/admins" element={<CreateAdmin />} />
                  <Route
                    path="/create-form-setter"
                    element={<CreateFormSetter />}
                  />
                  <Route path="/forms" element={<CreatedForms />} />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />
        {/* routes for admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserLayout>
                <Routes>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/create-form-setter"
                    element={<CreateFormSetter />}
                  />
                  <Route path="/forms" element={<CreatedForms />} />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />
        {/* routes for form setter */}
        <Route
          path="/formSetter/*"
          element={
            <ProtectedRoute allowedRoles={["formSetter"]}>
              <UserLayout>
                <Routes>
                  <Route path="/create-forms" element={<CreateForm />} />
                  <Route path="/forms" element={<CreatedForms />} />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* routes for applicants */}
        <Route
          path="/applicant/*"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <UserLayout>
                <Routes>
                  <Route path="/application-form" element={<FillForm />} />
                  <Route path="/registered-form" element={<FilledForm />} />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

import axiosInstance from "../api/config";

export const getAdmins = () => {
  return axiosInstance
    .get("/admin")
    .then((response) => response)
    .catch(() => {
      throw new Error("Error fetching admins");
    });
};

export const getFormSetters = () => {
  return axiosInstance
    .get("/headadmin/formsetter")
    .then((response) => response)
    .catch(() => {
      throw new Error("Error fetching admins");
    });
};
export const addAdmin = (formData) => {
  return axiosInstance
    .post("/headadmin/admin", formData)

    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};
export const addFormSetter = (formData) => {
  return axiosInstance
    .post("/headadmin/formsetter", formData)

    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

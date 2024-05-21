import axiosInstance from "../api/config";
export const deleteAdmin = (id) => {
    return axiosInstance
      .delete(`${"/headadmin/admin"}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        throw new Error("Error deleting admin");
      });
  };
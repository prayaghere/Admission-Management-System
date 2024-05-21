import axiosInstance from "../api/config";
export const deleteFormSetter = (id) => {
  return axiosInstance
    .delete(`${"/headadmin/formsetter"}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw new Error("Error deleting formsetter");
    });
};

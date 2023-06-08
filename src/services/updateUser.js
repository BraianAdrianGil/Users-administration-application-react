import { axiosInstance } from "../api/axiosInstance";

export const updateUser = async (id, newData) => {
  try {
    await axiosInstance.put(`users/${id}/`, newData);
  } catch (error) {
    console.log(error);
  }
};

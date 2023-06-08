import { axiosInstance } from "../api/axiosInstance";

export const deleteUserById = async (id) => {
  try {
    await axiosInstance.delete(`users/${id}`);
  } catch (error) {
    console.log(error);
  }
};

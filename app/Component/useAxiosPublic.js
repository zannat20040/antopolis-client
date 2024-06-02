"use client"
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://anopilis-server.vercel.app",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAppoint = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: appointment = [] } = useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointments");
      return res.data;
    },
  });
  return [appointment, refetch];
};

export default useAppoint;

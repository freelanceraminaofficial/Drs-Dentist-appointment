import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useGetUser = () => {
  const axiosSecure = useAxiosPublic();
  const { user } = useContext(AuthContext);

  // useQuery hook to fetch user data
  const {
    data: userData = [], // Default to an empty array if no data
    refetch,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["userData", user?.email], // Unique key for this query
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/user?email=${user?.email}`); // API call to fetch user data
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });

  return [userData, refetch, isPending, isError, error];
};

export default useGetUser;

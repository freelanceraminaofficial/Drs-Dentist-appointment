import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useGetUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  // Only run the query if user.email is available
  const {
    data: userData = null,
    refetch,
    isLoading,
    isError,
    error = "An error occurred while fetching user data.",
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { userData, refetch, isLoading, isError, error }; // Return an object here
};

export default useGetUser;

import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAppoint = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: appointment = [] } = useQuery({
    queryKey: ["appointment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments?email=${user.email}`);
      return res.data;
    },
  });
  return [appointment, refetch];
};

export default useAppoint;

import React, { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Create the AuthContext
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosPublic();

  const saveToken = (token) => localStorage.setItem("access-token", token);
  const removeToken = () => localStorage.removeItem("access-token");

  // Logout user
  const logOut = async () => {
    setLoading(true);
    try {
      await axiosSecure.post("/api/auth/logout");
      removeToken();
      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show a toast or alert to inform the user of the error.
    } finally {
      setLoading(false);
    }
  };

  // Check user authentication status on component mount
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get("/api/auth/status");
        const userData = response.data.user;

        if (userData?.id) {
          const tokenResponse = await axiosSecure.post("/jwt", {
            id: userData.id,
          });
          if (tokenResponse.data.token) {
            saveToken(tokenResponse.data.token);
          }
        } else {
          removeToken();
        }

        setUser(userData); // Update user state
      } catch (error) {
        console.error("Auth state error:", error);
        removeToken();
        setUser(null);
        // Optionally show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []); // Run only on component mount

  const authInfo = {
    user,
    loading,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <div className="spinner">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;

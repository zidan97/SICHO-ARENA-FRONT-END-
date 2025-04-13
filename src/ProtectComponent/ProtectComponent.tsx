import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../Store/useAuthStore";
import { message } from "antd";

const ProtectedRoute: React.FC<{ requiredRole?: string }> = ({
  requiredRole,
}) => {
  const { user } = useAuthStore();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserInformation = async (email: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${email}`
        );
        console.log("Fetched User Information:", response.data);
        setAdmin(response.data[0]);
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserInformation(user.email);
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !admin) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = admin.role === requiredRole;
  console.log("Is Admin:", isAdmin);

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import useAuthStore from "../Store/useAuthStore";
import { useFetchUserDataForStore } from "../Store/FetchUserInformation";
import axios from "axios";

const CallUserData = () => {
  const { user } = useAuthStore(); // Retrieve user from the auth store
  const { updateUserData } = useFetchUserDataForStore(); // Get the updater function

  //   const fetchUserInformation = async (email: string) => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/users/${email}`);
  //       console.log("Fetched User Information from callUserData:", response.data);
  //       updateUserData(response.data); // Update the state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching user information:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (user?.email) {
  //       fetchUserInformation(user.email);
  //     }
  //   }, [user]);

  //   return null; // This component doesn't render anything
  // };

  useEffect(() => {
    const fetchUserInformation = async (email: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${email}`
        );
        console.log("Fetched User Information:", response.data);
        updateUserData(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (user?.email) {
      fetchUserInformation(user.email);
    }
  }, [user, updateUserData]);
};
export default CallUserData;

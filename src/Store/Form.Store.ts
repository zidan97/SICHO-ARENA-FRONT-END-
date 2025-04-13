import axios from "axios";
import { create } from "zustand";
import flatTs from "../HelperFunctions/FlatObject";
import flatObject from "../HelperFunctions/FlatObject";
import flatObjects from "../HelperFunctions/FlatObject";
export const useBookingFormStore = create((set) => ({
  bookingData: {
    sportsAndPerson: {},
    date: {},
    time: {},
    personalInformation: {},
    paymentInformation: {},
  },
  updateSportsAndPerson: (sp) =>
    set((state) => {
      const updatedState = {
        bookingData: { ...state.bookingData, sportsAndPerson: sp },
      };
      console.log(
        "Updated sportsAndPerson:",
        updatedState.bookingData.sportsAndPerson
      );
      return updatedState;
    }),
  updateDate: (dt) =>
    set((state) => {
      const updateState = {
        bookingData: { ...state.bookingData, date: dt },
      };
      console.log("Updated DateTime: ", updateState.bookingData.date);
      return updateState;
    }),
  updateTime: (dt) =>
    set((state) => {
      const updateState = {
        bookingData: { ...state.bookingData, time: dt },
      };
      console.log("Updated DateTime: ", updateState.bookingData.time);
      return updateState;
    }),

  updatePersonalInformation: (pi) =>
    set((state) => {
      const updateState = {
        bookingData: { ...state.bookingData, personalInformation: pi },
      };
      console.log(
        "Updated Personal Information: ",
        updateState.bookingData.personalInformation
      );

      return updateState;
    }),

  updatePayment: (pt) =>
    set(async (state) => {
      const updateState = {
        bookingData: {
          ...state.bookingData,
          paymentInformation: pt,
        },
      };
      console.log(
        "Updated Payment Information",
        updateState.bookingData.paymentInformation
      );
      // console.log("Full : ", updateState.bookingData);
      const flatObjectOfData = flatObjects(updateState.bookingData);
      console.log("Flat Object", flatObjectOfData);
      try {
        const response = await axios.post(
          "http://localhost:3000/form",
          flatObjectOfData
        );

        console.log("response", response);
        // if (response.statusText == "Created") {
        //   alert("Your slot has been booked");
        // }
      } catch (error) {
        console.log("error", error);
      }
      return updateState;
    }),
}));

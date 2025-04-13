import React from "react";
import { Button, Card } from "antd";
import { useBookingFormStore } from "../Store/Form.Store";
import axios from "axios";

const OrderSummary = () => {
  const storeUpdate = useBookingFormStore();
  const updatePaymentInformation = useBookingFormStore(
    (state) => state.updatePayment
  );
  // console.log(storeUpdate.booking);
  console.log(storeUpdate);
  const orderDetails = {
    sportsCategory: storeUpdate?.bookingData?.sportsAndPerson?.sportsCategory,
    person: storeUpdate?.bookingData?.sportsAndPerson?.person.split("-")[0],
    date: storeUpdate?.bookingData?.date?.date,
    time: storeUpdate?.bookingData?.time?.time,
    place: storeUpdate?.bookingData?.time?.place,
    name: storeUpdate?.bookingData?.personalInformation?.name,
    email: storeUpdate?.bookingData?.personalInformation?.email,
    pn: storeUpdate?.bookingData?.personalInformation?.pn,
    price: storeUpdate?.bookingData?.sportsAndPerson?.person.split("-")[1],
  };

  const generateTransactionId = () => {
    const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const randomNum = Math.random().toFixed(4).substring(2);
    const personInfo = orderDetails.person;
    const transactionId = `${timeStamp}${personInfo}${randomNum}`;
    return transactionId;
  };

  const paymentDetails = async () => {
    const payment = {
      amount: parseInt(orderDetails.price),
      tranId: generateTransactionId(),
      customerName: orderDetails.name,
      customerEmail: orderDetails.email,
      customerPhone: orderDetails.pn,
      productName: orderDetails.sportsCategory,
    };
    updatePaymentInformation({
      transactionId: payment.tranId,
      status: "Pending",
    });
    try {
      const sslResponse = await axios.post(
        "http://localhost:3000/payment/initiate",
        payment
      );
      console.log("SSL Response", sslResponse.data);
      window.location.replace(sslResponse.data.paymentUrl);
      console.log(payment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center  border-2 ml-2 rounded-e-3xl p-4 min-h-72 border-blue-400">
      <Card
        title="Booking Summary"
        className="max-w-md w-full shadow-lg rounded-lg"
        headStyle={{ backgroundColor: "#17295A", color: "white" }}
      >
        <div className="p-4 space-y-3 text-lg">
          <div className="flex justify-between">
            <span className="font-semibold">Sports Category:</span>
            <span>{orderDetails.sportsCategory}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Person:</span>
            <span>{orderDetails.person}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span className="text-blue-600 font-semibold">
              {orderDetails.date}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Time:</span>
            <span>{orderDetails.time}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Place:</span>
            <span>{orderDetails.place}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{orderDetails.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{orderDetails.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Phone Number:</span>
            <span>{orderDetails.pn}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span className=" font-bold mb-4">{orderDetails.price} BDT</span>
          </div>
          <Button
            //

            onClick={paymentDetails}
            className="mt-14 w-full max-w-md bg-[#01030b] text-white font-bold"
          >
            Payment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderSummary;

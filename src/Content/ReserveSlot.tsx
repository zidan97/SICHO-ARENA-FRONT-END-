
import reserveSlot from "../../public/SportsCategory/ReserveSlot.jpeg"
import { useNavigate } from "react-router-dom";

const ReserveSlot = () => {
   const navigate = useNavigate();
   return (
      <div className="flex mt-8 gap-12 mb-12 items-center justify-center">
         {/* Text */}
         <div className="w-1/4 border-2 p-4 rounded-lg border-blue-600">
            <p className=" text-gray-800">Reserve your spot now at our Indoor Sports Academy! Limited slots available for exclusive training sessions. Join today to enhance your skills. Book your spot online or contact us directly.</p>
          <button className="btn py-2 px-4 rounded mt-6 text-xl font-semibold bg-[#4169e1] text-white"
          onClick={() => navigate("/booking")}
          >Reserve Your Slots Now</button>
         </div>
         {/* reserve Banner */}
         <div className="">
            <img src={reserveSlot} width={500} ></img>
            
         </div>
         
      </div>
   );
};

export default ReserveSlot;
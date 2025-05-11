import { Rate, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const Review = () => {
  // retrive data from the backend
  interface ReviewData {
    rating: number | undefined;
    review: string;
    name: string;
    _id: { $oid: string };
  }

  const [datas, setDatas] = useState<ReviewData[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reviews/three");
        // console.log(response);
        setDatas(response.data);
      } catch (error) {
        // console.log("");
        alert(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="mt-8 w-1/2 mx-auto">
      <h1 className="mb-4 text-center text-4xl py-4 font-semibold ">
        What our customers say
      </h1>

      <div className="grid grid-cols-3 gap-40 mb-24">
        {datas.map((data, index) => (
          <Card
            key={data._id.$oid || index}
            size="default"
            title={<Rate allowHalf defaultValue={data?.rating} disabled />}
            style={{ width: 290 }}
          >
            <div className="flex flex-col space-y-4">
              <h1>{data.review}</h1>
              <h1 className="text-xs text-center text-gray-600">{data.name}</h1>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Review;

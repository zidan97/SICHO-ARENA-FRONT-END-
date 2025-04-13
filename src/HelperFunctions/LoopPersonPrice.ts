import parsePersonPrice from "../Admin/Utils/ParsePersonPrice";

const LoopPersonPrice = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    return arr.map((item) => {
      const parsedValue = parsePersonPrice(item);
      return { label: parsedValue, value: item };
    });
  }
};
export default LoopPersonPrice;

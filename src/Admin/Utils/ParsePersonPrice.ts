const parsePersonPrice = (value: string) => {
  const [person, price] = value.split("-");
  return `${person} person--${price} BDT `;
};
export default parsePersonPrice;

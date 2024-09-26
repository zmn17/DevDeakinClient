import { IoStarSharp } from "react-icons/io5";
/* eslint-disable react/prop-types */
const Card = ({ image, title, desc, rate, author }) => {
  return (
    <div className="flex flex-col w-full h-auto max-w-xs p-4 shadow-lg gap-2 rounded-xl">
      <img src={image} alt="image" className="w[3rem] rounded-xl" />
      <h3>{title}</h3>
      <h5>{desc}</h5>
      <hr className="border-t border-gray-500" />
      <div className="flex items-center justify-between">
        <div className="flex flex-row-reverse items-center justify-between">
          <p>{rate}</p>
          <span>
            <IoStarSharp />
          </span>
        </div>
        <h5>{author}</h5>
      </div>
    </div>
  );
};

export default Card;

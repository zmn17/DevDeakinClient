/* eslint-disable react/prop-types */
import Card from "./Card.jsx";
import { generateArticleFakeData } from "./ArticleFakeData.js";
import { generateTutorialFakeData } from "./TutorialFakeData.js";

const FeaturedCards = ({ title }) => {
  var fakeData =
    title === "Tutorials"
      ? generateTutorialFakeData()
      : generateArticleFakeData();
  return (
    <div className="flex flex-col bg-[#f5f5dc] items-center justify-center gap-5">
      <h2 className="pt-5 text-4xl font-bold text-center font-gruppo">
        Featured {title}
      </h2>
      <div className="flex flex-wrap justify-around px-5 gap-4">
        {fakeData.map((item) => (
          <Card
            key={item.id}
            image={`https://picsum.photos/100?random=${item.id}`}
            title={item.itemName}
            desc={item.description}
            rate={item.rate}
            author={item.authorName}
          />
        ))}
      </div>
      <div className="flex justify-center w-full">
        <button className="py-1 px-8 bg-[#a9a9a9] rounded-2xl">
          See all {title}
        </button>
      </div>
    </div>
  );
};

export default FeaturedCards;

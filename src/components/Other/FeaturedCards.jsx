import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Card from "./Card.jsx";
import { generateTutorialFakeData } from "./TutorialFakeData.js";

const FeaturedCards = ({ title }) => {
  const [articlesData, setArticlesData] = useState([]);

  // Fetch real article data from Firestore
  const fetchArticleData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticlesData(fetchedData);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  useEffect(() => {
    if (title === "Articles") {
      fetchArticleData(); // Fetch articles only if title is "Articles"
    }
  }, [title]);

  // Use fake data for tutorials
  const tutorialData = generateTutorialFakeData();

  const dataToDisplay = title === "Tutorials" ? tutorialData : articlesData;

  return (
    <div className="flex flex-col bg-[#f5f5dc] items-center justify-center gap-5">
      <h2 className="pt-5 text-4xl font-bold text-center font-gruppo">
        Featured {title}
      </h2>
      <div className="flex flex-wrap justify-around px-5 gap-4">
        {dataToDisplay.map((item) => (
          <Card
            key={item.id}
            image={
              item.imageUrl || `https://picsum.photos/100?random=${item.id}`
            } // Fallback for image
            title={item.title || item.itemName} // itemName for fake data
            desc={item.description || item.desc} // desc for fake data
            rate={item.rate || 5} // Default rate
            author={item.author || "Zamin Ahmadi"} // Fallback for author
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

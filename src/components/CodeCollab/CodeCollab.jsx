import { useState, useEffect } from "react";
import axios from "axios";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CodeEditor from "./CodeEditor";

const CodeCollab = () => {
  const [code, setCode] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  // Fetch real-time code updates
  useEffect(() => {
    const codeDocRef = doc(db, "collab", "codeDoc");

    const unsubscribe = onSnapshot(codeDocRef, (doc) => {
      if (doc.exists()) {
        setCode(doc.data()?.code || "");
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle code input change and save to Firestore
  const handleCodeChange = async (newCode) => {
    const codeDocRef = doc(db, "collab", "codeDoc");

    try {
      await setDoc(codeDocRef, { code: newCode });
    } catch (error) {
      console.log("Error updating code:", error);
    }
  };

  // Handle ChatGPT API request
  const handleChatGPTRequest = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: code }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.gpt - api}`,
            "Content-Type": "application/json",
          },
        },
      );

      setChatResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error getting response from ChatGPT:", error);
      setChatResponse("Unable to fetch a response from ChatGPT.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h2 className="mb-4 text-2xl font-bold text-center">
        Real-Time Code Collaboration
      </h2>
      <CodeEditor code={code} handleCodeChange={handleCodeChange} />
      <button
        onClick={handleChatGPTRequest}
        className="p-2 mt-4 text-white bg-blue-600 rounded"
      >
        Get Help from ChatGPT
      </button>
      {chatResponse && (
        <div className="p-4 mt-4 text-white bg-gray-800 rounded">
          <strong>ChatGPT Response:</strong> {chatResponse}
        </div>
      )}
    </div>
  );
};

export default CodeCollab;

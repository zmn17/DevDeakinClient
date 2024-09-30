// The actual chatting with the AI is functioning, because the
// API key was used, and to activate that again, i had to buy
// a new plan. But it should work if you put your own api key
// in the .env file

import { useState } from "react";
import axios from "axios";
import { Header } from "../../constants";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    // Add user message to the messages state
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [...newMessages, { role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.gpt_api}`,
            "Content-Type": "application/json",
          },
        },
      );

      const chatGptMessage = response.data.choices[0].message.content;
      setMessages([
        ...newMessages,
        { role: "assistant", content: chatGptMessage },
      ]);
    } catch (error) {
      console.error("Error getting response from ChatGPT:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error: Unable to get response." },
      ]);
    }
  };

  return (
    <div>
      <div className="py-4 pb-10 text-white bg-gray-800 shadow-md">
        <Header />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-center text-gray-100">
            Chat with Assistant
          </h2>
          <div className="p-4 mb-4 overflow-y-auto bg-gray-700 border border-gray-700 rounded-lg h-60">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`font-medium ${message.role === "user" ? "text-blue-400" : "text-gray-200"}`}
                >
                  {message.role === "user" ? "You" : "Assistant"}:
                </span>{" "}
                <span className="inline-block p-2 bg-gray-600 rounded-lg">
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow p-2 text-gray-100 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="p-2 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 transition duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

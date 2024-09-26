import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import QuestionCard from "./QuestionCard";
import { Button, Form, Input } from "semantic-ui-react";
import { Header } from "../../constants";

const FindQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState({ title: "", tag: "", date: "" });
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Filter questions based on title, tag, and date
  const filterQuestions = () => {
    const { title, tag, date } = filter;
    const filtered = questions.filter((q) => {
      return (
        (title === "" || q.title.toLowerCase().includes(title.toLowerCase())) &&
        (tag === "" || q.tags.includes(tag)) &&
        (date === "" ||
          (q.createdAt &&
            new Date(q.createdAt.seconds * 1000).toLocaleDateString() === date))
      );
    });
    setFilteredQuestions(filtered);
  };

  // Handle input change for filters
  const handleFilterChange = (e, { name, value }) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Handle delete question
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Questions", id));
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    setFilteredQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.id !== id),
    );
  };

  // Handle expanding question details
  const handleExpand = (id) => {
    setExpandedQuestionId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "Questions"));
      const questionList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionList);
      setFilteredQuestions(questionList);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen -center bg-gray-50">
      <div className="w-full py-3 pb-10 text-white bg-gray-800 shadow-md">
        <Header />
      </div>

      <h1 className="mb-6 text-3xl font-bold">Find Questions</h1>

      {/* Filter Form */}
      <Form className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Form.Field>
          <Input
            placeholder="Filter by title"
            name="title"
            value={filter.title}
            onChange={handleFilterChange}
            className="mb-4"
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Filter by tag"
            name="tag"
            value={filter.tag}
            onChange={handleFilterChange}
            className="mb-4"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            className="mb-4"
          />
        </Form.Field>
        <Button
          onClick={filterQuestions}
          className="w-full text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          Apply Filters
        </Button>
      </Form>

      <div className="w-full max-w-lg mt-8">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="mb-4">
            <QuestionCard
              q={q}
              expandedQuestionId={expandedQuestionId}
              handleExpand={handleExpand}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindQuestion;

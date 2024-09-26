import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import QuestionCard from "./QuestionCard";
import { Button, Form, Input } from "semantic-ui-react";

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

  // Handle drag end event to reorder questions
  const handleDragEnd = (e, data, id) => {
    const index = filteredQuestions.findIndex((q) => q.id === id);
    const updatedQuestions = [...filteredQuestions];
    const [movedItem] = updatedQuestions.splice(index, 1);
    updatedQuestions.splice(data.y, 0, movedItem);
    setFilteredQuestions(updatedQuestions);
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
    <div className="flex flex-col items-center justify-center h-[100%] mt-[13rem]">
      <h1>Find Questions</h1>

      {/* Filter Form */}
      <Form className="w-full max-w-md">
        <Form.Field>
          <Input
            placeholder="Filter by title"
            name="title"
            value={filter.title}
            onChange={handleFilterChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Filter by tag"
            name="tag"
            value={filter.tag}
            onChange={handleFilterChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="date"
            placeholder="Filter by date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
          />
        </Form.Field>
        <Button onClick={filterQuestions}>Apply Filters</Button>
      </Form>

      <div className="w-full max-w-lg mt-8">
        {filteredQuestions.map((q) => (
          <div key={q.id}>
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

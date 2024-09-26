import { useState } from "react";
import { Form, Container, Radio, Header } from "semantic-ui-react";
import { PostQuestion, PostArticle } from "../../constants.js";
import { Header as Hheader } from "../../constants";

const PostType = () => {
  const [isQuestion, setIsQuestion] = useState(false);

  const handlePostType = (e, { value }) => {
    e.preventDefault();
    setIsQuestion(value === "Question");
  };

  return (
    <Container
      className="flex flex-col bg-[#f5f5dc]"
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        overflow: "hidden",
        minWidth: "100vw",
      }}
    >
      <div className="w-full py-3 pb-10 mb-[5rem] text-white bg-gray-800 shadow-md">
        <Hheader />
      </div>
      <Form className="flex items-center justify-center gap-5">
        <Header as="h4" className="flex items-center justify-center mb-2">
          New Post:
        </Header>
        <Form.Group inline>
          <Form.Field>
            <Radio
              label="Question"
              name="postType"
              value="Question"
              checked={isQuestion}
              onChange={handlePostType}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Article"
              name="postType"
              value="Article"
              checked={!isQuestion}
              onChange={handlePostType}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      {isQuestion ? <PostQuestion /> : <PostArticle />}
    </Container>
  );
};

export default PostType;

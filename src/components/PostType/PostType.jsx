import { useState } from "react";
import { Form, Container, Radio, Header } from "semantic-ui-react";
import { PostQuestion, PostArticle } from "../../constants.js";

const PostType = () => {
  const [isQuestion, setIsQuestion] = useState(false);

  const handlePostType = (e, { value }) => {
    e.preventDefault();
    setIsQuestion(value === "Question");
  };

  return (
    <Container
      className="mt-[4rem] flex flex-col bg-[#f5f5dc]"
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        overflow: "hidden",
        minWidth: "100vw",
      }}
    >
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

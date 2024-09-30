import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  Form,
  Button,
  Header,
  Segment,
  Container,
  Grid,
} from "semantic-ui-react";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown";
import "codemirror/lib/codemirror.css"; // Import CodeMirror styles
import "codemirror/theme/material.css"; // Choose a theme
import "codemirror/mode/markdown/markdown"; // Import Markdown mode

const PostQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Questions"), {
        title,
        description,
        tags,
        createdAt: new Date(),
      });
      alert("Question posted successfully");
      setTitle("");
      setDescription("");
      setTags("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Container className="form-container">
      <Grid centered>
        <Grid.Column computer={8} tablet={12} mobile={16}>
          <Segment padded="very" className="form-segment">
            <Header as="h3" textAlign="center">
              Ask a Question
            </Header>
            <Form onSubmit={handlePost}>
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Start your question with how, what, why, etc."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Describe your problem (Markdown supported)</label>
                <CodeMirror
                  value={description}
                  options={{
                    mode: "markdown",
                    theme: "material",
                    lineNumbers: true,
                    viewportMargin: Infinity,
                    lineWrapping: true,
                    styleActiveLine: true,
                  }}
                  className="code-mirror-editor" // Add class for custom styling
                  onBeforeChange={(editor, data, value) => {
                    setDescription(value);
                  }}
                  onChange={(editor, data, value) => {
                    setDescription(value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Preview</label>
                <div className="markdown-preview">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              </Form.Field>
              <Form.Field>
                <label>Tags</label>
                <input
                  placeholder="Please add up to 3 tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Form.Field>
              <Button type="submit" primary fluid>
                POST
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default PostQuestion;

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  Form,
  TextArea,
  Button,
  Header,
  Segment,
  Container,
  Grid,
} from "semantic-ui-react";

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
                <label>Describe your problem</label>
                <TextArea
                  placeholder="Tell us more about the problem..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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

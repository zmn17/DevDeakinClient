/* eslint-disable react/prop-types */
import { Card, Button } from "semantic-ui-react";

const QuestionCard = ({
  q,
  expandedQuestionId,
  handleExpand,
  handleDelete,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header onClick={() => handleExpand(q.id)}>{q.title}</Card.Header>
        <Card.Meta>
          {q.createdAt
            ? new Date(q.createdAt.seconds * 1000).toLocaleDateString()
            : "No Date Available"}
        </Card.Meta>
        {expandedQuestionId === q.id && (
          <Card.Description>
            <p>{q.description}</p>
            <p>Tags: {q.tags}</p>
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <Button basic color="red" onClick={() => handleDelete(q.id)}>
          Delete
        </Button>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;

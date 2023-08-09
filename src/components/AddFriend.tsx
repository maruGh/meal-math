import { Button, Col, Form, Row } from "react-bootstrap";

interface Props {
  onAddNew: () => void;
}
const AddFriend = ({ onAddNew }: Props) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onAddNew();
  };

  return (
    <Form className="mt-2 p-3" onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3 " controlId="name">
        <Form.Label column>🧑‍🤝‍🧑 Friend name</Form.Label>
        <Col>
          <Form.Control type="text" placeholder="Eg Maru Demamu" disabled />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="imageUrl">
        <Form.Label column>🖼 image url</Form.Label>
        <Col>
          <Form.Control type="url" placeholder="https://" disabled />
        </Col>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="outline-primary" type="submit">
          Add friend
        </Button>
      </div>
    </Form>
  );
};

export default AddFriend;

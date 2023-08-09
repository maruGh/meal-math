import { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Friend } from "./shared/interfaces";

interface Props {
  friend: Friend | undefined;
  onHandleSplit: (x: number) => void;
}

const BillForm = ({ friend, onHandleSplit }: Props) => {
  const [billValue, setBillValue] = useState<string | number>("");
  const [userExpense, setUserExpense] = useState<string | number>("");
  const [whoPay, setWhoPay] = useState(1);
  const friendExpense = billValue ? +billValue - +userExpense : "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (+billValue <= 0 || +userExpense < 0 || +friendExpense < 0) return;
    // console.log(billValue);
    // console.log(userExpense);
    // console.log(whoPay);

    // onSelectedUser(+friendExpense * (whoPay === 1 ? 1 : -1));
    onHandleSplit(whoPay === 1 ? +friendExpense : -friendExpense);
    setBillValue("");
    setUserExpense("");
  };

  return (
    <div className="primary-color p-5 ">
      <h3>
        SPLIT A BILL WITH <strong>{friend?.name}</strong>
      </h3>
      <Form className="pt-5" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="billValue">
          <Form.Label column>💰 Bill value</Form.Label>
          <Col>
            <Form.Control
              type="number"
              value={billValue}
              onChange={(e) =>
                setBillValue(+e.target.value ? +e.target.value : "")
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="my">
          <Form.Label column>🫵 Your expense</Form.Label>
          <Col>
            <Form.Control
              type="number"
              value={userExpense}
              onChange={(e) =>
                setUserExpense(
                  +e.target.value <= +billValue ? +e.target.value : userExpense
                )
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="frEx">
          <Form.Label column>
            🫵 <strong>{friend?.name}:-</strong> expense
          </Form.Label>
          <Col>
            <Form.Control type="number" disabled value={friendExpense} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="who">
          <Form.Label column>💳 Who is paying the bill</Form.Label>
          <Col>
            <Form.Select
              value={whoPay}
              onChange={(e) => setWhoPay(+e.target.value)}
            >
              <option value={1}>You</option>
              <option value={-1}>{friend && friend.name}</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="subBtn">
          {/* <Form.Label column>🫵 Friend expense</Form.Label> */}
          <Col>
            <Button type="submit">submit</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BillForm;

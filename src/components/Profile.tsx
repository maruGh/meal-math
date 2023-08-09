import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Friend } from "./shared/interfaces";

interface Props {
  friend: Friend;
  selectedUser: Friend | null;
  onSelectedUser: (x: Friend) => void;
}

const Profile = ({ friend, selectedUser, onSelectedUser }: Props) => {
  const isSelected = friend.id === selectedUser?.id ? "primary-color" : "";

  return (
    <Card className={`border-0 hover ${isSelected}`}>
      <Card.Body className="p-0">
        <Row className="d-flex justify-content-center align-items-center text-center p-2">
          <Col lg={2} sm={4} xs={4} className="d-flex justify-content-center">
            <Image src={friend.picture} roundedCircle fluid />
          </Col>
          <Col lg={8} className="text-sm-center text-md-start ">
            <h3 className="mb-0">{friend.name}</h3>
            {friend.balance === 0 && (
              <span>
                You and <strong>{friend.name}</strong> are even
              </span>
            )}
            {friend.balance < 0 && (
              <span className="text-danger">
                You owe <strong>{friend.name}</strong>{" "}
                {Math.abs(friend.balance)} Birr
              </span>
            )}
            {friend.balance > 0 && (
              <span className="text-success">
                <strong>{friend.name}</strong> owes you {friend.balance} Birr
              </span>
            )}
          </Col>
          <Col lg={2} className="d-flex justify-content-end ">
            <Button
              variant="outline-success"
              onClick={() => onSelectedUser(friend)}
            >
              {isSelected ? "close" : "select"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Profile;

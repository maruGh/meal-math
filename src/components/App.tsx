import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./App.css";
import BillForm from "./BillForm";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";
import { Friend } from "./shared/interfaces";

const generateProfile = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    return {
      name: { first: "Maru", last: "Demamu" },
      picture: { large: "profile/maru.jpeg" },
    };
  }
};

function App() {
  const [friendApi, setFriendApi] = useState<Friend[]>([]);
  const [isAddNew, setIsAddNew] = useState(false);
  // const [isSelectBill, setIsSelectBill] = useState(false);
  const [isAddBtnClick, setIsAddBtnClick] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await generateProfile();
      // setFriendApi([...friendApi, {}])
      const newData = {
        id: crypto.randomUUID(),
        name: `${data.name.first} ${data.name.last}`,
        picture: data.picture.large,
        balance: 0,
      };
      setFriendApi((p) => [...p, newData]);
    };
    fetchData();
  }, [isAddNew]);

  // console.log(friendApi.find((f) => f.id == whoSelectBill));

  const handleNew = () => {
    setIsAddNew((p) => !p);
    setIsAddBtnClick((btn) => !btn);
  };
  // const handleWhoSelectBill = (x: string) => setWhoSelectBillIdx(x);

  const handleSelectUser = (friend: Friend) => {
    setSelectedUser(friend.id === selectedUser?.id ? null : friend);
    setIsAddBtnClick(false);
  };

  const handleSplit = (balance: number) => {
    // const newData = [...friendApi];
    // const a = newData.findIndex((f) => f?.id == selectedUser?.id);
    // newData[a].balance = newData[a].balance + balance;
    // setFriendApi(newData);

    setFriendApi(
      friendApi.map((friend) =>
        friend.id === selectedUser?.id
          ? { ...friend, balance: friend.balance + balance }
          : friend
      )
    );
  };

  return (
    <Container className="border p-3 ">
      <Row>
        <Col className="d-flex flex-column " sm={12} md={5}>
          <FriendList
            selectedUser={selectedUser}
            onSelectedUser={handleSelectUser}
            onAddNew={handleNew}
            data={friendApi}
            // onSelectBtn={() => setIsSelectBill((b) => !b)}
          />

          {/* Add friend */}
          <div className="d-flex flex-column bg-light">
            {isAddBtnClick && <AddFriend onAddNew={handleNew} />}
            <Button
              className="w-25 align-self-end mx-3 mb-3"
              variant={`outline-${isAddBtnClick ? "danger" : "primary"} mt-3`}
              onClick={() => setIsAddBtnClick((i) => !i)}
            >
              {isAddBtnClick ? "close" : "Add friend"}
            </Button>
          </div>
        </Col>
        <Col
          sm={12}
          md={6}
          className="d-flex border h-50 align-items-center justify-content-center"
        >
          {selectedUser && (
            <BillForm friend={selectedUser} onHandleSplit={handleSplit} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;

import Profile from "./Profile";
import { Friend } from "./shared/interfaces";

interface Props {
  onAddNew: () => void;
  data: Friend[];
  // onSelectBtn: () => void;
  selectedUser: Friend | null;
  onSelectedUser: (x: Friend) => void;
}

const FriendList = ({ data, selectedUser, onSelectedUser }: Props) => {
  return (
    <>
      {data.map((friend, idx) => (
        <Profile
          key={idx}
          friend={friend}
          selectedUser={selectedUser}
          onSelectedUser={onSelectedUser}
        />
      ))}
    </>
  );
};

export default FriendList;

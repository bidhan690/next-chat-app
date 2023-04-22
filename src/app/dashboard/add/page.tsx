import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

const AddPage: FC = ({}) => {
  return (
    <main className="pt-8 ">
      <h1 className="font-bold text-3xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default AddPage;

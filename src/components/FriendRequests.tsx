"use client";
import { Check, UserPlus } from "lucide-react";
import { FC, useState } from "react";

interface FriendRequestsProps {
  incomingFriendReqs: IncomingFriendReq[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendReqs,
  sessionId,
}) => {
  const [friendReq, setFriendReq] =
    useState<IncomingFriendReq[]>(incomingFriendReqs);
  console.log(friendReq);
  return (
    <>
      {friendReq.length === 0 && (
        <p className="text-sm text-zinc-500 ">Nothing to show here... </p>
        // ) : (
        //   friendReq.map((request) => {
        //     <div key={request.senderId} className="flex gap-4 items-4">
        //       <UserPlus className="text-black" />
        //       <p className="font-medium text-lg">{request.senderEmail}</p>
        //       <button
        //         aria-label="accept friend request"
        //         className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md "
        //       >
        //         <Check className="font-semibold text-white w-3/4 h-3/4" />
        //       </button>
        //       <button></button>
        //     </div>;
        //   })
      )}
    </>
  );
};

export default FriendRequests;

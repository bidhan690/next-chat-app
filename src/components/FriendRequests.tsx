"use client";
import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface FriendRequestsProps {
  incomingFriendReqs: IncomingFriendReq[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendReqs,
  sessionId,
}) => {
  const router = useRouter();

  const [friendReq, setFriendReq] =
    useState<IncomingFriendReq[]>(incomingFriendReqs);

  const acceptFriendRequest = async (senderId: string) => {
    await axios.post("/api/friends/accept", {
      id: senderId,
    });
    setFriendReq((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriendRequest = async (senderId: string) => {
    await axios.post("/api/friends/deny", {
      id: senderId,
    });
    setFriendReq((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendReq.length === 0 ? (
        <p className="text-sm text-zinc-500 ">Nothing to show here... </p>
      ) : (
        friendReq.map((request) => {
          return (
            <div key={request.senderId} className="flex gap-4 items-4">
              <UserPlus className="text-black" />
              <p className="font-medium text-lg">{request.senderEmail}</p>
              <button
                onClick={() => acceptFriendRequest(request.senderId)}
                aria-label="accept friend request"
                className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md "
              >
                <Check className="font-semibold text-white w-3/4 h-3/4" />
              </button>

              <button
                onClick={() => denyFriendRequest(request.senderId)}
                aria-label="deny friend request"
                className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md "
              >
                <X className="font-semibold text-white w-3/4 h-3/4" />
              </button>
            </div>
          );
        })
      )}
    </>
  );
};

export default FriendRequests;

"use client";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface FriendRequestSideOptionsProps {
  sessionId: string;
  initialUnseenReqCount: number;
}

const FriendRequestSideOptions: FC<FriendRequestSideOptionsProps> = ({
  sessionId,
  initialUnseenReqCount,
}) => {
  const [unseenReqCount, setUnseenReqCount] = useState<number>(
    initialUnseenReqCount
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_request`)
    );
 
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));
    const friendRequestHandler = () => {
      //realtime request count
      setUnseenReqCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenReqCount((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_request", friendRequestHandler);
    pusherClient.bind("new-friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_request`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
      pusherClient.unbind("new-friend", addedFriendHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend Requests</p>
      {unseenReqCount > 0 && (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600">
          {unseenReqCount}
        </div>
      )}
    </Link>
  );
};

export default FriendRequestSideOptions;

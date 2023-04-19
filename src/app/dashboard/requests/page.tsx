import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const RequestsPage = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const incomingSenderId = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_request`
  )) as string[];

  const incomingFriendReq = await Promise.all(
    incomingSenderId.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const parsedSender = JSON.parse(sender) as Users;
      return {
        senderId,
        senderEmail: parsedSender.email,
        senderName: parsedSender.name,
        senderImage: parsedSender.image,
      };
    })
  );

  return (
    <main className="pt-8 ml-2">
      <h1 className="font-bold text-3xl mb-8">Add a friend</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendReqs={incomingFriendReq}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default RequestsPage;

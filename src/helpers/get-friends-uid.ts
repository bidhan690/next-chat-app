import { fetchRedis } from "./redis";

export default async function getFriendsByUserId(userId: string) {
  //get friends of loggedIn user

  const friendIds = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];
  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
      const parsedFriend = JSON.parse(friend) as Users;
      return parsedFriend;
    })
  );
  return friends;
}

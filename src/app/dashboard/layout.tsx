import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Icon, Icons } from "@/components/ui/Icons";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestSideOptions from "@/components/FriendRequestSideOptions";
import { fetchRedis } from "@/helpers/redis";

interface LayoutProps {
  children: ReactNode;
}

interface SideBarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sideBarOptions: SideBarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const unseenReqCount = (
    await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_request`
    )
  ).length;

  return (
    <div className="w-full h-screen flex">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto  border-r border-gray-200 bg-white px-6">
        <Link href="/dashboard" className="h-16 flex shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>
        <nav className="flex flex-col flex-1">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>Chats</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1   ">
                {sideBarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 justify-center items-center rounded-lg border text-[0.625rem] font-medium bg-white ">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <FriendRequestSideOptions
                sessionId={session.user.id}
                initialUnseenReqCount={unseenReqCount}
              />
            </li>
            <li className="-mx-6 mt-auto flex  items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    src={session.user.image || ""}
                    alt="googleImage"
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                  />
                </div>
                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400 " aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <div className="flex items-center mr-1">
                <SignOutButton className="h-full aspect-square" />
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;

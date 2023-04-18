import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session) redirect("/dashboard");
  return <p />;
}

import { cookies } from "next/headers";
import HomeClient from "./HomeClient";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) redirect("/login");
  return <HomeClient token={token} />;
}

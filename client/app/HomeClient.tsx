"use client";

import { verifyToken } from "@/utils/APIs";
import { APIRequest } from "@/utils/networkCalls";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // ✅ App Router!
import { useEffect } from "react";
import Home from "./components/Home";

function HomeClient({ token }: { token: string }) {
  const router = useRouter();

  const { isPending, isError } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: () =>
      APIRequest({
        url: verifyToken,
        data: { token },
      }),
    retry: false,
    enabled: !!token,
  });
  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  if (isPending) return <div>Checking token...</div>;

  if (isError) return null;

  return (
    <div>
      <Home />
    </div>
  );
}

export default HomeClient;

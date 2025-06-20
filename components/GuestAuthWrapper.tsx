"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "./ui/toaster";

const guestUser = {
  $id: "guest",
  accountId: "guest",
  fullName: "Guest",
  email: "",
  avatar: "/assets/images/avatar.png",
};

export default function GuestAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isGuest") === "true"
    ) {
      setIsGuest(true);
    }
  }, []);

  if (!isGuest) return <>{children}</>;

  return (
    <main className="flex h-screen">
      <Sidebar {...guestUser} />
      <section className="flex h-full flex-1 flex-col">
        <Header userId={guestUser.$id} accountId={guestUser.accountId} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
}

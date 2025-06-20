import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { isGuestServer } from "@/app/lib/server-utils";

export const dynamic = "force-dynamic";

const guestUser = {
  $id: "guest",
  accountId: "guest",
  fullName: "Guest",
  email: "",
  avatar: "/assets/images/avatar.png",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  // Check for guest mode on the server
  if (!currentUser && !(await isGuestServer())) {
    return redirect("/sign-in");
  }

  // If guest, use guestUser props
  const user = currentUser || guestUser;

  return (
    <main className="flex h-screen">
      <Sidebar {...user} />
      <section className="flex h-full flex-1 flex-col">
        <Header userId={user.$id} accountId={user.accountId} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};
export default Layout;

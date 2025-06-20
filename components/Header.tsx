"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const handleSignOut = async () => {
    await fetch("/api/sign-out", { method: "POST" });
    localStorage.removeItem("isGuest");
    window.location.href = "/sign-in";
  };
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <Button
          type="button"
          className="sign-out-button"
          onClick={handleSignOut}
        >
          <Image
            src="/assets/icons/logout.svg"
            alt="logo"
            width={24}
            height={24}
            className="w-6"
          />
        </Button>
      </div>
    </header>
  );
};
export default Header;

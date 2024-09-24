"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { TbLogout2 } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { SafeUser } from "../../../types";

interface userMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <DropdownMenu>
        <div className="relative z-30">
          <DropdownMenuTrigger>
            <div className="p-1 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700" onClick={toggleOpen}>
              <Avatar src={currentUser?.image} />
              <AiFillCaretDown size={16} />
            </div>
          </DropdownMenuTrigger>

          {currentUser ? (
            <DropdownMenuContent className="w-56 absolute -right-5">
              <DropdownMenuItem onClick={toggleOpen}>
                <Link href={"/myOrder"} className="w-full">
                  Your Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleOpen}>
                <Link href={"/admin"}>Admin dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
              >
                <TbLogout2 size={20} />
                <span className="ml-2 cursor-pointer">Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="w-56 absolute -right-5">
              <DropdownMenuItem onClick={toggleOpen}>
                <Link href={"/login"}>Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleOpen}>
                <Link href={"/register"}>Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}

          {/* {isOpen && (
            <div className="absolute rounded-md shadow-md w">

            </div>
        )} */}
        </div>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;

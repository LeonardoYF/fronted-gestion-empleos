import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/hooks/auth";
import Link from 'next/link'

export default function App() {
    const { user } = useUser()
    const {logout} = useAuth()
  return (
    <div className="flex items-center text-neutral-950 gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" className="text-neutral-950">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">{user.name}</p>
            <p className="font-bold">Admin</p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href='/perfil'>
            Mi configuracion
            </Link>
            
          </DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem onClick={logout} key="logout" color="danger">
            Salir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

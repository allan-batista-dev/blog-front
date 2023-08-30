"use client";
import { Post } from "@/app/common/types/post.types";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { MoreVertical } from "lucide-react";
import Link from "next/link";

export function ButtonAction({ id }: any) {

  return (
    <Menubar>
      <MenubarMenu  >
        <MenubarTrigger className="flex justify-center">
          <MoreVertical />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={`admin/edit-post/${id}`}>Editar</Link>
          </MenubarItem>
          <MenubarItem className="cursor-pointer">
            Excluir
          </MenubarItem>
          <MenubarItem>
            Moderar comentarios
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

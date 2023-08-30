"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { MoreVertical } from "lucide-react";

export function ButtonAction() {
  return (
    <Menubar>
      <MenubarMenu  >
        <MenubarTrigger className="flex justify-center">
          <MoreVertical />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Editar
          </MenubarItem>
          <MenubarItem>
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

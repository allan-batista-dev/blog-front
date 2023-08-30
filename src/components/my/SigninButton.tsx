"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function SigninButton() {
    const { data: session } = useSession()

    function handleSignOutClick() {
        signOut(); // Chame a função signOut com as opções adequadas aqui
      }

    return (
        <div>
            {
                session ? (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AB</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {session?.user?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>
                                    <Link href={"/admin"}>Admin</Link>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel onClick={handleSignOutClick} className="flex cursor-pointer items-center gap-2">
                                    <ExitIcon/> Sair
                                </DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>



                    </div>
                ) : (
                    <div>
                        <Button variant={"outline"}>
                            Signin
                        </Button>
                    </div>
                )
            }
        </div>
    )
}
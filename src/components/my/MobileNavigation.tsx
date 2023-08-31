"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Home, List, LogOut, Mail, Settings } from "lucide-react";
import { Separator } from "../ui/separator";
import SigninMobile from "./SigninMobile";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function MobileNavigation() {
    const { data: session } = useSession()

    function handleSignOutClick() {
        signOut();
    }

    return (
        <>
            <div className="mb-10">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <List />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="py-16">
                        <Separator />
                        <div className="my-5">
                            <SigninMobile />
                        </div>
                        <div>
                            <Link href={'/'}>
                                <Button className="w-full mb-5" variant={"outline"}>
                                    <Home className="mr-2 h-4 w-4" /> Inicio
                                </Button>
                            </Link>
                        </div>
                        <div>
                            {
                                session && (
                                    <Link href={'/admin'}>
                                        <Button className="w-full mb-5" variant={"outline"}>
                                            <Settings className="mr-2 h-4 w-4" /> Painel admin
                                        </Button>
                                    </Link>
                                )
                            }
                        </div>
                        {
                            session && (
                                <div className="mt-auto mb-5">
                                    <SheetFooter >
                                        <Button onClick={handleSignOutClick} className="w-full mb-5" variant={"outline"}>
                                            <LogOut className="mr-2 h-4 w-4" /> Sair
                                        </Button>
                                    </SheetFooter>
                                </div>
                            )
                        }
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

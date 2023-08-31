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
import { List, LogOut, Mail } from "lucide-react";
import { Separator } from "../ui/separator";
import SigninMobile from "./SigninMobile";
import { useSession, signOut } from "next-auth/react";

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
                            <Button className="w-full mb-5" variant={"outline"}>
                                <Mail className="mr-2 h-4 w-4" /> Login with Email
                            </Button>
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

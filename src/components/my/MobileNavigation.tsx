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
import { List, Mail } from "lucide-react";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import SigninButton from "@/app/(auth)/signin/SigninButton";
import SigninMobile from "./SigninMobile";

export function MobileNavigation() {
    const { data: session } = useSession();
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
                        <Button className="w-full mb-5" variant={"outline"}>
                            <Mail className="mr-2 h-4 w-4" /> Login with Email
                        </Button>
                        <Separator />
                    </SheetContent>
                </Sheet>
            </div>
            <div>
                <Separator />
            </div>
        </>
    )
}

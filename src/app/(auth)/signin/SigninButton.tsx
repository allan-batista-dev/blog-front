"use client";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninButton() {
    const { data: session } = useSession()
    const [email, setEmail] = useState('allanbatistadev@gmail.com');
    const [password, setPassword] = useState('Buddy2609');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            router.push('/admin');
        } catch (error) {
            setErrorMessage('Usuário ou senha incorretos');
            setIsLoading(false);
        }
    };

    function handleSignOutClick() {
        signOut();
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
                                    <Link className="flex items-center gap-2" href={"/admin"}>
                                        <Settings /> Painel admin
                                    </Link>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel onClick={handleSignOutClick} className="flex cursor-pointer items-center gap-2">
                                    <LogOut /> Sair
                                </DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Painel Admin</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Faça seu login</DialogTitle>
                                    <DialogDescription>
                                        Coloque suas credenciais para ter acesso ao painel administrador
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="name"
                                                className="text-right">
                                                Email
                                            </Label>
                                            <Input
                                                id="name"
                                                value={email}
                                                className="col-span-3"
                                                required
                                                onChange={({ target }) => {
                                                    setEmail(target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Senha
                                            </Label>
                                            <Input
                                                type="password"
                                                id="username"
                                                value={password}
                                                className="col-span-3"
                                                required
                                                onChange={({ target }) => {
                                                    setPassword(target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">
                                            Login
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
        </div>
    )
}
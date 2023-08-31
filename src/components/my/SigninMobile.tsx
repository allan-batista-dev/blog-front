"use client";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { LogInIcon, LogOut, Settings, SignalIcon } from "lucide-react";
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

export default function SigninMobile() {
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
    return (
        <div>
            {
                session ? (
                    <div>
                        <div className="flex justify-center mb-3">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                        </div>
                        <p className="text-center text-lg font-semibold">
                            {session.user?.name}
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                            {session.user?.email}
                        </p>
                    </div>
                ) :
                    (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full" variant="outline"><LogInIcon className="mr-2 h-4 w-4" />Acessar painel admin</Button>
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
                    )
            }
        </div>
    )
}


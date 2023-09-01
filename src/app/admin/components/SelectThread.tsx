"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import api from "@/app/api/axios";
import { useSession } from "next-auth/react";

type Thread = {
    title: string,
    id: number
}

export default function SelectThread() {
    const [data, setData] = useState<Thread[]>([]);
    const [title, setTitle] = useState('');
    const { data: session } = useSession();
    const token = session?.user?.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}threads`);

                if (!res.ok) {
                    throw new Error('Erro ao buscar threads')
                }

                const data = await res.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const registerThread = async (e: FormEvent) => {

        try {
            const data = {
                title
            }
            const res = await api.post(`threads`, data, {
                headers: { Authorization: `bearer ${token}` }
            })
        } catch (error) {
            throw new Error(`Error post thread ${error}`)
        }

    }

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center gap-4 ">
                <div className="w-full">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma thread" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {data?.map((thread, item) => (
                                    <SelectItem key={item} value={`${thread.id}`}>{thread.title}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Adicione uma nova thread</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Adicionar thread</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <form onSubmit={registerThread}>
                                    <div className="mb-5">
                                        <Input
                                            id="thread"
                                            value={title}
                                            className="col-span-3"
                                            placeholder="Thread"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>

                                    <DialogFooter>
                                        <Button variant={'outline'} type="submit">Adicionar</Button>
                                    </DialogFooter>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}
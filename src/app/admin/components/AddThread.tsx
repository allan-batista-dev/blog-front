import api from "@/app/api/axios";
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
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddThread() {
    const [title, setTitle] = useState('');
    const { data: session } = useSession();
    const token = session?.user?.access_token;

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
    )
}
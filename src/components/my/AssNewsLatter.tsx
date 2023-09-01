"use client";
import { AlertCircle, ArrowBigDown, Check, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "@/app/api/axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function AssNewsLatter() {
    const [assNews, setAssNews] = useState('');
    const [assSuccess, setAssSuccess] = useState(false);
    const [loaderBtn, setLoaderBtn] = useState(false);

    const register = async (e: FormEvent) => {
        e.preventDefault();
        setLoaderBtn(true);
        try {
            const data = {
                email: assNews
            }
            const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}newsletter/ass-newsletter`, data);

            setAssSuccess(true);
        } catch (err) {
            throw new Error(`error ${err}`);
        }
    }

    const Success = () => {
        return (
            <Alert variant={`success`}>
                <Check className="h-4 w-4" />
                <AlertTitle>Sucesso</AlertTitle>
                <AlertDescription>
                    Obrigado por ter assinado nossa Newsletter.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <>
            <Separator />
            <section className="my-10">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center gap-10">
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Assine a Newsletter e fique por dentro de tudo
                        </h2>
                        <p className="leading-7 mb-5">
                            Noticias sobre o mundo da tecnologia e atualizaões das nossa threads semanalmente
                        </p>
                    </div>
                    <div>

                        {
                            assSuccess ? (
                                <Success />
                            ) :
                                (
                                    <div>
                                        <div className="flex justify-center">
                                            <ArrowBigDown className="animate-bounce" />
                                        </div>
                                        <form onSubmit={register}>
                                            <div className="mb-3">
                                                <Input
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                        setAssNews(event.target.value)
                                                    }
                                                    value={assNews}
                                                    type="email"
                                                    required
                                                    placeholder="E-mail"
                                                />
                                            </div>
                                            <div className="flex justify-center">
                                                <Button type="submit" variant={"outline"}>
                                                    {
                                                        loaderBtn ? (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <span>Assinar</span>
                                                        )
                                                    }
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
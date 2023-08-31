"use client";
import { ArrowBigDown } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function AssNewsLatter() {
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
                        <div className="flex justify-center">
                            <ArrowBigDown className="animate-bounce" />
                        </div>
                        <div className="mb-3"> 
                            <Input placeholder="E-mail" />
                        </div>
                        <div className="flex justify-center">
                            <Button variant={"outline"}>
                                Assinar
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
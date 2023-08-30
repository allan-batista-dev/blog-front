"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Post } from "@/app/common/types/post.types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import TimeLineComments from "@/components/my/TimeLineComments";
import PostComments from "@/components/my/PostComment";

export default function PostUnique() {
    const [data, setData] = useState<Post | null>(null);
    const pathname = usePathname();
    const parts = pathname?.split("/");
    const postID = parts?.[parts.length - 1];
    const postIDAsNumber = parseInt(postID, 10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/${postID}`);

                if (!res.ok) {
                    throw new Error(`Error fetch post `)
                }

                const responseData = await res.json();
                setData(responseData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    });

    if (!data) {
        return <p>Carregando...</p>;
    }
    return (
        <>
            <section className="my-10">
                <div className="my-10">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                        {data.title}
                    </h1>
                    <h2 className="scroll-m-20  pb-2 mb-5 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        {data.subtitle}
                    </h2>
                    <div>
                        <small className="text-sm font-medium leading-none">Por Allan Batista</small>
                    </div>
                    <div>
                        <small className="text-sm font-medium leading-none text-muted-foreground">
                            Atualizado: {new Date(data.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}
                        </small>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-center px-52 py-10">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE}${data.file}`}
                        alt={data.title}
                        width={500}
                        height={500}
                        layout="responsive"
                    />
                </div>
                <div className="my-10">
                    <Card>
                        <div className="p-10">
                            {data.content}
                        </div>
                    </Card>
                </div>
                <div className="my-10">
                    <Card className="py-10">
                        <h3 className="scroll-m-20 px-10  pb-2 mb-5 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Comente sobre o post:
                        </h3>
                        <div className="p-10">
                            <PostComments idPost={postIDAsNumber}/>
                        </div>
                    </Card>
                </div>
                <div className="my-10">
                    <Card className="py-10">
                        <h4 className="scroll-m-20 px-10  pb-2 mb-5 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Comentarios:
                        </h4>
                        <TimeLineComments comments={data.comments || []} />
                    </Card>
                </div>
            </section>
        </>
    )
}
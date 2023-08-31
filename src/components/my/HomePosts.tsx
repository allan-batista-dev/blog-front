"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
import { Post } from "@/app/common/types/post.types";
import notImage from '../../../public/not-image-post.png'
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

function paginate(array: any, page_size: any, page_number: any) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export default function HomePosts() {
    const [data, setData] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post`);
                if (!res.ok) {
                    throw new Error("Erro ao buscar posts");
                }
                const data = await res.json();
                
                // Remove o primeiro post do array
                if (data.length > 0) {
                    data.shift();
                }
                
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const itemsPerPage = 6;

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const currentItems = paginate(data, itemsPerPage, currentPage);

    const showPrevButton = currentPage > 1;
    const showNextButton = currentItems.length === itemsPerPage;

    return (
        <>
            <Separator />
            <section className="my-10">
                <h1 className="scroll-m-20 py-5 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Veja mais
                </h1>
                <div className="grid md:grid-cols-2 sm:grid-col-1 gap-10">
                    {currentItems.map((post: Post) => (
                        <div key={post.id}>
                            <Link href={`/post/${post.id}`}>
                                <Card className="p-0">
                                    <div className="dark:hover:bg-gray-900 hover:bg-gray-100">
                                        <div>
                                            <Image
                                                src={
                                                    post.file
                                                        ? `${process.env.NEXT_PUBLIC_SUPABASE}${post.file}`
                                                        : notImage
                                                }
                                                alt="teste"
                                                width={500}
                                                height={500}
                                                layout="responsive"
                                                className="max-h-52 rounded-t-lg"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="scroll-m-20 px-5 py-5 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                                                {post.title ?? "-"}
                                            </h2>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center px-5 py-5">
                                                <div className="text-muted-foreground text-sm">
                                                    {new Date(post.created_at ?? '-').toLocaleString('pt-BR', { timeZone: 'UTC' })}
                                                </div>
                                                <div className="flex">
                                                    Veja mais <ArrowBigRight />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    {showPrevButton && (
                        <Button variant={"outline"} onClick={prevPage}>Página anterior</Button>
                    )}
                    {showNextButton && (
                        <Button variant={"outline"} onClick={nextPage}>Próxima página</Button>
                    )}
                </div>
            </section>
        </>
    );
}

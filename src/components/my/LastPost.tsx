"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Post } from "@/app/common/types/post.types";
import Link from "next/link";
import notImage from '../../../public/not-image-post.png'
import { Skeleton } from "../ui/skeleton";

export default function LastPost() {
  const [data, setData] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/last-post`);

        if (!res.ok) {
          throw new Error('Erro ao buscar contatos')
        }

        const responseData = await res.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 items-center my-10">
        <div>
          <Skeleton className="h-12 w-52 mb-8" />
          <Skeleton className="h-5 w-auto mb-4" />
          <Skeleton className="h-5 w-1/2 mb-10" />
          <Skeleton className="h-3 w-1/4" />
        </div>
        <div>
          <Skeleton className="h-72 w-auto" />
        </div>
      </div>
    )
  }

  return (
    <section className="my-10">
      <div className="grid justify-center items-center sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {data.title}
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 mb-6">
              {data.subtitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(data.created_at ?? '-').toLocaleString('pt-BR', { timeZone: 'UTC' })}
            </p>
          </div>
        </div>
        <div>
          <Link href={`/post/${data.id}`}>
            <Image
              src={
                data.file
                  ? `${process.env.NEXT_PUBLIC_SUPABASE}${data.file}`
                  : notImage
              }
              alt="teste"
              width={500}
              height={500}
              layout="responsive"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

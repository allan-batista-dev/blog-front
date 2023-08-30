"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Post } from "@/app/common/types/post.types";
import Link from "next/link";

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
    return <p>Carregando...</p>;
  }

  return (
    <section className="my-10">

      <div className="grid justify-center items-center grid-cols-2 gap-6">
        <div>
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {data.title}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6 mb-6">
              {data.subtitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(data.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}
            </p>
            <div className="mt-10">
              <Link href={`/post/${data.id}`}>
                <Button variant="link" className="p-0">Ver mais <ArrowBigRight /></Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href={`/post/${data.id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE}${data.file}`}
              alt={data.title}
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

"use client";
import { Post } from "@/app/common/types/post.types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/app/api/axios";
import { useSession } from "next-auth/react";
import FormPost from "../../components/FormPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditPost() {
    const pathname = usePathname();
    const parts = pathname?.split("/");
    const postID = parts?.[parts.length - 1];
    const { data: session } = useSession();
    const token = session?.user?.access_token;

    const [data, setData] = useState<Post | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/${postID}`);

                if (!res.ok) {
                    throw new Error(`Error fetching post`);
                }

                const responseData = await res.json();
                setData(responseData);
                setThreadID(responseData.threadId);
                setTitle(responseData.title || "");
                setSubtitle(responseData.subtitle || "");
                setFile(responseData.file || "");
                setContent(responseData.content || "");
                setIsActive(responseData.isActive ?? false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [postID]);

    const [threadId, setThreadID] = useState<number | undefined>();
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean | undefined>();

    const registerEdit = async () => {
        try {
            const dataEdit = {
                isActive,
                threadId,
                subtitle,
                file,
                title,
                content
            };

            const res = await api.patch('post', dataEdit, {
                headers: { Authorization: `bearer ${token}` }
            });

        } catch (error) {
            console.error(`Erro ao editar o post: ${error}`);
        }
    }

    return (
        <>
            {data && (
                <form onSubmit={registerEdit}>
                    <FormPost
                        userId={session?.user?.id}
                        threadId={data.threadId ?? 0}
                        isActive={data.isActive ?? false}
                        file={data.file}
                        title={data.title || ""}
                        content={data.content || ""}
                        subtitle={data.subtitle || ""}
                        onTitleChange={setTitle}
                        onSubtitleChange={setSubtitle}
                        onFileChange={setFile}
                        onContentChange={setContent}

                    />
                    <div className="my-10">
                        <Button className="w-full" variant={"outline"}>
                            Salvar
                        </Button>
                    </div>
                </form>
            )}
        </>
    )
}

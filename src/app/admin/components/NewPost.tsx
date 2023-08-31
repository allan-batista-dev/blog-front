"use client";
import {  useState } from "react";
import api from "@/app/api/axios";
import { useSession } from "next-auth/react";
import FormPost from "./FormPost";

export default function EditPost() {
    const { data: session } = useSession();
    const token = session?.user?.access_token;
    const [threadId, setThreadID] = useState<number | undefined>();
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean | undefined>();
    const currentUserId = session?.user?.id;

    const register = async () => {
        try {
            const data = {
                isActive,
                threadId,
                subtitle,
                file,
                title,
                content,
            };

            const res = await api.post('post', data, {
                headers: { Authorization: `bearer ${token}` }
            });
        } catch (error) {
            console.error(`Erro ao adicionar post o post: ${error}`);
        }
    }

    return (
        <>
            <form onSubmit={register}>
                <FormPost
                    userId={currentUserId}
                    threadId={threadId}
                    file={file}
                    title={title}
                    content={content}
                    subtitle={subtitle}
                />
            </form>
        </>
    )
}

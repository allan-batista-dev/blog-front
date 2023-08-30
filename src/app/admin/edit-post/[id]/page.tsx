"use client";

import { Post } from "@/app/common/types/post.types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/app/api/axios";
import { useSession } from "next-auth/react";
import FormPost from "../../components/FormPost";

export default function EditPost() {
    const [data, setData] = useState<Post | null>();
    const pathname = usePathname();
    const parts = pathname?.split("/");
    const postID = parts?.[parts.length - 1];
    const { data: session } = useSession();
    const token = session?.user?.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/${postID}`);

                if (!res.ok) {
                    throw new Error(`Error fetching post`);
                }

                const responseData = await res.json();
                setData(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [postID]);

    const [threadId, setThreadID] = useState(data?.threadId);
    const [title, setTitle] = useState(`${data?.title}`);
    const [subtitle, setSubtitle] = useState(`${data?.subtitle}`);
    const [file, setFile] = useState(`${data?.file}`);
    const [content, setContent] = useState(`${data?.content}`);
    const [isActive, setIsActive] = useState<boolean | undefined>(data?.isActive);

    const registerEdit = async () => {
        try {
            const dataEdit = {
                isActive,
                threadId,
                subtitle,
                file,
                title,
                content
            }

            const res = await api.patch('post', dataEdit, {
                headers: { Authorization: `bearer ${token}` }
            })

        } catch (error) {
            throw new Error(`error edit post ${error}`)
        }
    }

    return (
        <>
            <FormPost
                threadId={threadId ?? 0}
                isActive={isActive === true ? true : false}
                file={file}
                title={title}
                content={content}
                subtitle={subtitle}
            />
        </>
    )
}
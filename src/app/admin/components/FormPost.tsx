"use client";
import MyEditor from "@/app/admin/components/TextEdit";
import { Post } from "@/app/common/types/post.types";

export default function FormPost({
    title, threadId, subtitle, file, isActive, content
}: Post) {
    return (
        <>
            <form>
                <MyEditor value={content} />
            </form>
        </>
    )
}
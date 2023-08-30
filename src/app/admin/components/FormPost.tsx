"use client";

import { Post } from "@/app/common/types/post.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function FormPost({
    title, threadId, subtitle, file, isActive, content, userId
}: Post) {
    let toolbarOptions = [
        ['bold', 'italic'], ['link', 'image'],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    const module = {
        toolbar: toolbarOptions
    }
    return (
        <>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Título</Label>
                <Input
                    placeholder={title}
                />
            </div>
            <div>

            </div>
            <div>
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Conteúdo</Label>
                <ReactQuill modules={module} theme="snow" value={content} />
            </div>
        </>
    )
}
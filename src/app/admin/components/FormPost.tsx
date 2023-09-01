"use client";

import { Post } from "@/app/common/types/post.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
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

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const uploadFile = () => {
        if (selectedFile) {
            console.log("Arquivo selecionado:", selectedFile);
        } else {
            alert("Selecione um arquivo antes de fazer upload.");
        }
    };

    return (
        <>
            <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                </label>
                <input type="file" id="uploadFile" name="file" accept=".jpg, .jpeg, .png, .pdf" onChange={handleFileChange} />
                <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={uploadFile}
                    >
                        Adicionar capa
                    </Button>
                </div>
            </div>
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
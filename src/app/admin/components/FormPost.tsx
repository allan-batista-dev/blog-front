"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Post } from "@/app/common/types/post.types";
import 'react-quill/dist/quill.snow.css';
import SelectThread from "./SelectThread";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function FormPost({
    title, threadId, subtitle, file, isActive, content, userId
}: Post) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Thread</Label>
                <SelectThread />
            </div>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Capa</Label>
                <Input
                    type="file"
                    onChange={handleFileChange}
                    value={file}
                    accept="image/*"
                    id="picture"
                    required
                    className="cursor-pointer"
                />
                {previewUrl && (
                    <div className="mt-2">
                        <label className="text-muted-foreground">Prévia</label>
                        <div className="flex justify-center">
                            <img src={previewUrl} alt="Preview" className="max-h-32 mt-2" />
                        </div>
                    </div>
                )}
            </div>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Título</Label>
                <Input
                    placeholder={title}
                />
            </div>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Subtitulo</Label>
                <Input
                    placeholder={subtitle}
                />
            </div>
            <div>
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Conteúdo</Label>
                <ReactQuill modules={{ toolbar: true }} theme="snow" value={content} />
            </div>
        </>
    )
}

"use client";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import 'react-quill/dist/quill.snow.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

type Thread = {
    title: string,
    id: number
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import React from "react";
import AddThread from "./AddThread";
import { Button } from "@/components/ui/button";

export default function GenericForm({
    title,
    subtitle,
    file,
    content,
    onTitleChange,
    onSubtitleChange,
    onFileChange,
    onContentChange,
}: any) {


    const SelectThread = ({ threadId, onThreadIdChange }: any) => {
        const [data, setData] = useState<Thread[]>([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}threads`);

                    if (!res.ok) {
                        throw new Error('Erro ao buscar threads')
                    }

                    const data = await res.json();
                    setData(data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }, []);
        return (
            <>
                <div className="w-full">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma thread" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {data?.map((thread, item) => (
                                    <SelectItem key={item} value={`${threadId}`}>{thread.title}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Thread</Label>
                <div className="flex items-center gap-6">
                    <SelectThread
                    // onChange={onCha}
                    // value={}
                    /><AddThread />
                </div>
            </div>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Capa</Label>
                <Input
                    type="file"
                    onChange={onFileChange}
                    value={file}
                    accept="image/*"
                    id="picture"
                    required
                    className="cursor-pointer"
                />
                {/* Resto do código para a prévia da imagem */}
            </div>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Título</Label>
                <Input
                    placeholder={title}
                    onChange={onTitleChange}
                    required
                />
            </div>
            <div className="mb-10">
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Subtitulo</Label>
                <Input
                    placeholder={subtitle}
                    onChange={onSubtitleChange}
                    required
                />
            </div>
            <div>
                <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Conteúdo</Label>
                <ReactQuill
                    modules={{ toolbar: true }}
                    theme="snow"
                    value={content}
                    onChange={onContentChange}
                />
            </div>
        </>
    );
}


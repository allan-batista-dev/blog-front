"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "@/app/api/axios";
import { useSession } from "next-auth/react";
import FormPost from "./FormPost";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import LoadingForm from "@/components/my/LoadingForm";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewPost() {
    const { data: session } = useSession();
    const token = session?.user?.access_token;
    const [threadId, setThreadID] = useState<number | undefined>();
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState<string>('');
    const currentUserId = session?.user?.id;
    const [userId, setUserId] = useState(currentUserId)
    const [file, setSelectedFile] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const router = useRouter();

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

    const register = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData();
            formData.append("subtitle", subtitle);
            formData.append("file", file);
            formData.append("title", title);
            formData.append("content", content);
            const res = await api.post('post', formData, {
                headers: {
                    Authorization: `bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTitle('');
            setSubtitle('');
            setSelectedFile('')
            setContent('')
            router.push(`/post/${res.data.id}`)
            setIsLoading(false)
        } catch (error) {
            console.error('Erro ao adicionar post o post:', error);
        }
    }

    return (
        <>
            <div>
                {
                    isLoading && (
                        <div className="my-auto">
                            <LoadingForm />
                        </div>
                    )
                }
                <form onSubmit={register}>
                    <div className="mb-10">
                        <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Capa</Label>
                        <Input
                            type="file"
                            onChange={handleFileChange}
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
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setTitle(event.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="mb-10">
                        <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Subtitulo</Label>
                        <Input
                            placeholder={subtitle}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setSubtitle(event.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="mb-10">
                        <Label className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Conteúdo</Label>
                        <ReactQuill
                            modules={{ toolbar: true }}
                            theme="snow"
                            value={content}
                            onChange={(value: string) =>
                                setContent(value)
                            }
                        />
                    </div>

                    <div className="my-10">
                        <Button type="submit" className="w-full" variant={"outline"}>
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

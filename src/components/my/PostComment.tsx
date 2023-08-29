"use client";
import api from "@/app/api/axios";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";

export default function PostComments({ idPost }: any) {
    const [nameAuthor, setNameAuthor] = useState('')
    const [text, setText] = useState('');
    const [commentList, setCommentList] = useState<Comment[]>([]);

    const registerComment = async (event: FormEvent) => {
        event.preventDefault();

        try {

            const data = {
                nameAuthor,
                text,
                postId: idPost
            }
            const res = await api.post("comment", data)
            
            if (res.status === 201) {
                const newComment = res.data; // suponhamos que o servidor retorna o novo comentário.
                setCommentList([...commentList, newComment]);
                setNameAuthor('');
                setText('');
            }
            setNameAuthor('');
            setText('');
        } catch (error) {

        }
    }

    return (
        <form onSubmit={registerComment}>
            <div className="mb-2">
                <Input
                    placeholder="Sou nome (opcional)"
                    value={nameAuthor}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setNameAuthor(event.target.value)
                    }
                />
            </div>
            <div className="grid w-full gap-4">
                <Textarea
                    placeholder="Escreva seu comentario sobre a postagem..."
                    required
                    value={text}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        setText(event.target.value)
                    }
                />
                <div className="flex justify-end">
                    <Button type="submit" variant={"outline"}>Enviar comentario</Button>
                </div>
            </div>
        </form>
    )
}

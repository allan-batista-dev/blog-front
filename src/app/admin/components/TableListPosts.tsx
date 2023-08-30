import { Post } from "@/app/common/types/post.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { StatusSwitch } from "./StatusSwitch";
import { ButtonAction } from "./ButtonAction";

export function TableListPosts() {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post`);

        if (!res.ok) {
          throw new Error('Erro ao buscar posts')
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
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID publicação</TableHead>
            <TableHead>Data publicação</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Ativo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="font-medium">{new Date(item.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <StatusSwitch />
              </TableCell>
              <TableCell className=" flex justify-end pe-0">
                <ButtonAction id={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </>
  )
}

"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import MyEditor from "@/app/admin/components/TextEdit";
import { Card } from "@/components/ui/card";
import LastPost from "@/components/my/LastPost";
import { TableListPosts } from "./TableListPosts";

export function TabsNavigation() {
    return (
        <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create-post">Nova postagem</TabsTrigger>
                <TabsTrigger value="my-posts">Minhas postagens</TabsTrigger>
            </TabsList>
            <TabsContent value="create-post">
                <section className="my-10">
                    <Card className="p-10">
                        <MyEditor />
                    </Card>
                </section>
            </TabsContent>
            <TabsContent value="my-posts">
                <section className="my-10">
                    <Card className="p-10">
                        <LastPost />
                        <TableListPosts/>
                    </Card>
                </section>
            </TabsContent>
        </Tabs>
    )
}

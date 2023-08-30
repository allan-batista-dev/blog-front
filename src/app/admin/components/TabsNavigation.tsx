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
import { List } from "lucide-react";

export function TabsNavigation() {
    return (
        <Tabs defaultValue="admin-post">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="admin-post">
                     Postagens
                </TabsTrigger>
                <TabsTrigger value="admin-threads">
                     Threads
                </TabsTrigger>
                <TabsTrigger value="my-posts">
                    Nova postagem
                </TabsTrigger>
            </TabsList>
            <TabsContent value="admin-post">
                <section className="my-10">
                    <Card className="p-10">
                        <TableListPosts />
                    </Card>
                </section>
            </TabsContent>
            <TabsContent value="admin-threads">
                <section className="my-10">
                    <Card className="p-10">
                        <LastPost />
                        <TableListPosts />
                    </Card>
                </section>
            </TabsContent>
            <TabsContent value="create-post">
                <section className="my-10">
                    <Card className="p-10">
                        <MyEditor />
                    </Card>
                </section>
            </TabsContent>

        </Tabs>
    )
}

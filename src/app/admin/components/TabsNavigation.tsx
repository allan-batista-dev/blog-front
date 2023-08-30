"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Card } from "@/components/ui/card";
import LastPost from "@/components/my/LastPost";
import { TableListPosts } from "./TableListPosts";
import FormPost from "./FormPost";

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
                   {/* <FormPost dataPost={}/> */}
                </section>
            </TabsContent>

        </Tabs>
    )
}

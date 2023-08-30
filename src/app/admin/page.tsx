"use client";
import { useState } from "react";
import { TabsNavigation } from "./components/TabsNavigation";
import DialogDeletePost from "./components/DialogDeletePost";

export default function Admin() {
    
    
    return (
        <>
           <TabsNavigation/>
           <DialogDeletePost />
        </>
    )
}
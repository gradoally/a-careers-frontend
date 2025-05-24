"use client"

import { use } from "react";
import TaskProvider from "@/lib/provider/task.provider";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string; id: number }>;
};

export default function Layout({ children, params }: Props) {
    const { id } = use(params);
    return (<TaskProvider id={id}>
        {children}
    </TaskProvider>);
}

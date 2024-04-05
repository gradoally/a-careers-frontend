"use client"

import TaskProvider from "@/lib/provider/task.provider";

type Props = {
    children: React.ReactNode;
    params: { locale: string; id: number };
};

export default function Layout({ children, params }: Props) {
    return (<TaskProvider id={params.id}>
        {children}
    </TaskProvider>);
}

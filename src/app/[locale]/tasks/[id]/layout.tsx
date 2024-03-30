"use client"

import TaskProvider from "@/lib/provider/task.provider";

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export default function Layout({ children }: Props) {
    return (<TaskProvider>
        {children}
    </TaskProvider>);
}
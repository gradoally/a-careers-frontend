import React, { useState, useMemo } from "react";

import { Order } from "@/openapi/client";
import { getOrder } from "@/services/order";
import { useAuthContext } from "./auth.provider";

interface ITaskContent {
    loading: boolean,
    status: string,
    content: Order | null
}

interface ITaskArgs {
    index: number;
    locale: string;
}

interface ITaskContext {
    task: ITaskContent;
    updateTask:(task:Order) => void;
    loadTask: (args: ITaskArgs) => void;
    isCustomer: boolean;
    isResponses: boolean;
}

const TaskContext = React.createContext<ITaskContext>({
    task: {
        loading: false,
        status: "",
        content: null
    },
    updateTask(task:Order) {},
    loadTask(args) { },
    isCustomer: false,
    isResponses: false
})

export const useTask = (): ITaskContext => {
    const context = React.useContext(TaskContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}

export default function TaskProvider(props: React.PropsWithChildren) {
    const { user } = useAuthContext();
    const [task, setTask] = useState<{
        loading: boolean,
        status: string,
        content: Order | null
    }>({
        loading: false,
        status: "",
        content: null
    });

    function updateTask(updatedTask: Order) {
        task.content = updatedTask;
        setTask({ ...task });
    }

    function loadTask(args: ITaskArgs) {
        if (task.loading) return;
        setTask({
            loading: true,
            status: "loading",
            content: null
        });
        getOrder(args)
            .then(res => {
                setTask({
                    loading: false,
                    status: "success",
                    content: res.data
                });
            }).catch(() => {
                setTask({
                    loading: false,
                    status: "fail",
                    content: null
                });
            })
    }

    const isCustomer = useMemo(() => {
        return user?.data?.index === task.content?.customer?.index;
    }, [task, user]);

    const isResponses = useMemo(() => {
        return (task.content?.status === 1 && task.content?.responsesCount) ? true : false;
    }, [task])

    return (
        <TaskContext.Provider value={{ task, loadTask, updateTask, isCustomer, isResponses }}>
            {props.children}
        </TaskContext.Provider>
    );
};

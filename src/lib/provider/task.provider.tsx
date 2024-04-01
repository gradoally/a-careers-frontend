import React, { useState, useMemo } from "react";

import { useAuthContext } from "./auth.provider";

import { getOrder } from "@/services/order";

import { Order, UserResponse } from "@/openapi/client";
import { IOrderArgs } from "@/interfaces/serviceArgs";
import useTaskMetaInfo, { ITaskMetaInfo } from "@/hooks/useTaskFunc";

interface ITaskContent {
    loading: boolean,
    status: string,
    content: Order | null
}

interface ITaskContext {
    task: ITaskContent;
    updateTask: (task: Order) => void;
    loadTask: (args: IOrderArgs) => void;
    info: ITaskMetaInfo;
    response?: UserResponse;
    selectResponse: (response: UserResponse) => void;
}

const TaskContext = React.createContext<ITaskContext>({
    task: {
        loading: false,
        status: "",
        content: null
    },
    updateTask(task: Order) { },
    loadTask(args) { },
    info: {
        isCustomer: false,
        isResponses: false,
        isResponded: false,
        statusCode: -1
    },
    selectResponse: (response: UserResponse) => { }
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
    const [selectedResponse, setSelectedResponse] = useState<UserResponse>();

    const info = useTaskMetaInfo(task.content, user?.data);

    function selectResponse(response: UserResponse) {
        setSelectedResponse(response);
    }

    function updateTask(updatedTask: Order) {
        task.content = updatedTask;
        setTask({ ...task });
    }

    function loadTask(args: IOrderArgs) {
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

    return (
        <TaskContext.Provider value={{
            task,
            loadTask,
            updateTask,
            info,
            response: selectedResponse,
            selectResponse
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};

import React, { useState } from "react";

import { useAuthContext } from "./auth.provider";


import useTaskMetaInfo, { ITaskMetaInfo } from "@/hooks/useTaskFunc";

import { getOrder, getOrderResponses } from "@/services/order";

import { Order, UserResponse } from "@/openapi/client";
import { IOrderArgs } from "@/interfaces/serviceArgs";
import { IContent } from "@/interfaces/request";

interface ITaskContext {
    task: IContent<Order | null>;
    info: ITaskMetaInfo;
    updateTask: (task: Order) => void;
    loadTask: (args: IOrderArgs) => void;
    loadResponses: (index: number) => void;
    responses: IContent<UserResponse[]>;
    response?: UserResponse;
    selectResponse: (response: UserResponse) => void;
}

const TaskContext = React.createContext<ITaskContext>({
    task: {
        loading: false,
        status: "",
        content: null
    },
    info: {
        isCustomer: false,
        isResponses: false,
        isResponded: false,
        statusCode: -1
    },
    updateTask(task: Order) { },
    loadTask(args) { },
    loadResponses(index: number) { },
    responses: {
        loading: false,
        status: "",
        content: []
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
    const [task, setTask] = useState<IContent<Order | null>>({
        loading: false,
        status: "",
        content: null
    });
    const [responses, setResponses] = useState<IContent<UserResponse[]>>({
        loading: false,
        status: "",
        content: []
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

    function loadResponses(index: number) {
        if (responses.loading) return;
        setResponses({
            loading: true,
            status: "loading",
            content: []
        });
        getOrderResponses(index)
            .then(res => {
                setResponses({
                    loading: false,
                    status: "success",
                    content: res.data || []
                });
            }).catch(() => {
                setResponses({
                    loading: false,
                    status: "fail",
                    content: []
                });
            })
    }

    return (
        <TaskContext.Provider value={{
            task,
            info,
            loadTask,
            updateTask,
            loadResponses,
            responses,
            response: selectedResponse,
            selectResponse
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./auth.provider";

import useTaskMetaInfo, { ITaskMetaInfo } from "@/hooks/useTaskFunc";
import useTab, { ITabHook } from "@/hooks/useTab";
import useUserStats, { IStats } from "@/hooks/useUserStats";

import { getOrder, getOrderActivities, getOrderResponses } from "@/services/order";

import { Order, UserResponse } from "@/openapi/client";
import { IOrderArgs } from "@/interfaces/serviceArgs";
import { IContent } from "@/interfaces/request";
import { useLocale } from "next-intl";

interface ITaskProviderProps extends React.PropsWithChildren {
    id: number;
}

interface ITaskContext {
    task: IContent<Order | null>;
    info: ITaskMetaInfo;
    stats: IStats;
    updateTask: (task: Order) => void;
    loadTask: (args: IOrderArgs) => void;
    loadResponses: (index: number) => void;
    responses: IContent<UserResponse[]>;
    response?: UserResponse;
    selectResponse: (response: UserResponse) => void;
    tabHandler: ITabHook;
    profileView: boolean;
    toggleProfileView: (args: { response?: UserResponse, view: boolean }) => void;
}

const TaskContext = React.createContext<ITaskContext>({
    task: {
        loading: false,
        status: "",
        content: null
    },
    stats: {
        freelancer: 0,
        customer: 0
    },
    info: {
        isCustomer: false,
        isResponses: false,
        isResponded: false,
        isWorkStarted: false,
        isHired: false,
        isSameLanguage: true,
        isProfile: {
            customer: false,
            freelancer: false
        },
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
    selectResponse: (response: UserResponse) => { },
    tabHandler: {
        tab: 0,
        changeTab(newTab) {
        }
    },
    profileView: false,
    toggleProfileView: (args: { response?: UserResponse, view: boolean }) => { }
})

export const useTask = (): ITaskContext => {
    const context = React.useContext(TaskContext)
    if (context === undefined) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context
}

export default function TaskProvider(props: ITaskProviderProps) {
    const router = useRouter();
    const locale = useLocale();
    const { user } = useAuthContext();
    const [task, setTask] = useState<IContent<Order | null>>({
        loading: false,
        status: "",
        content: null
    });
    const { stats, loadStats } = useUserStats();
    const [responses, setResponses] = useState<IContent<UserResponse[]>>({
        loading: false,
        status: "",
        content: []
    });
    const [selectedResponse, setSelectedResponse] = useState<UserResponse>();
    const [profileView, setProfileView] = useState(false);

    const info = useTaskMetaInfo(task.content, user?.data);

    const tabHandler = useTab();

    function selectResponse(response?: UserResponse) {
        if (!info.isCustomer) return;
        setSelectedResponse(response);
    }

    function toggleProfileView({ response, view }: { response?: UserResponse, view: boolean }) {
        setProfileView(view);
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
        if (responses.loading || responses.status === "success") return;
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

    function loadOffer(index: number) {
        getOrderActivities(index)
            .then(res => {
                const activities = (res.data || []);
                const activity = activities.find(act => act.opCode === 3);
                if (activity && task.content) {
                    task.content.price = activity?.order?.price || task.content?.price || 0;
                    task.content.deadline = activity?.order?.deadline || task.content?.deadline || "";
                    setTask({ ...task });
                }
            }).catch(() => {
                console.log("Error occured");
            })
    }

    //Load task
    useEffect(() => {
        if (props.id < 0) router.replace('/en');
        if (!user) return;
        loadTask({ index: props.id, translateTo: locale, currentUserIndex: user?.data?.index });
    }, [props.id, user]);


    useEffect(() => {
        const user = info.isProfile.customer ? task.content?.customer : task.content?.freelancer;
        if (!user || (stats.customer && stats.freelancer)) return;
        loadStats(user.index);
    }, [info, task]);

    //Load responses
    useEffect(() => {
        if (![1, 20, 21].includes(info.statusCode)) return;
        if (!task.content || task.content.index === undefined) return;
        loadResponses(task.content.index);
    }, [info.statusCode, task]);

    //Load offer
    useEffect(() => {
        if (info.statusCode !== 2) return;
        if (!task.content || task.content.index === undefined) return;
        loadOffer(task.content?.index)
    }, [info.statusCode]);

    return (
        <TaskContext.Provider value={{
            task,
            info,
            stats,
            loadTask,
            updateTask,
            loadResponses,
            responses,
            response: selectedResponse,
            selectResponse,
            tabHandler,
            profileView,
            toggleProfileView
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};

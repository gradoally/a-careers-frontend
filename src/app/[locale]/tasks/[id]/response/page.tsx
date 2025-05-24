"use client"

import React, { use } from "react";

import Stepper from "./stepper";

interface Props {
    params: Promise<{
        category: string;
        locale: string;
        id: number;
    }>;
};

export default function Page({ params }: Props) {
    const { id } = use(params);

    return (
        <Stepper id={id} />
    )
}


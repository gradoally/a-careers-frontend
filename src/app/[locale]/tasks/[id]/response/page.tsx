"use client"

import React from "react";

import Stepper from "./stepper";

interface Props {
    params: {
        category: string;
        locale: string;
        id: number;
    },
};

export default function Page({ params }: Props) {

    return (
        <Stepper id={params.id} />
    )
}


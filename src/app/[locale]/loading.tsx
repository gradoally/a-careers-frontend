"use client"
import React from "react";
import Image from "@/components/Image";

export default function Loading() {
    return (
        <div className="h-screen flex justify-center items-center">
            <Image alt={"Alfamater loader"} src="/loader.webp"
                   width={"100"} height={"100"}/>
        </div>
    );
}

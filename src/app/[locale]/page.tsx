"use client"

import React, { Suspense, lazy } from "react";

import { Loader } from "@/components/features/Loaders";

const Content = lazy(() => import('./page.content'));

export default async function Home() {
    return (
        <Suspense fallback={<Loader />}>
            <Content />
        </Suspense>
    );
}

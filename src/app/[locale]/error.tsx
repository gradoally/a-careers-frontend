'use client';

import React from 'react';
import clsx from "clsx";
import Button from "@mui/material/Button";

import {Boundary} from "@/components/ui/boundary";

export default function Error({error, reset}: any) {
    React.useEffect(() => {
        console.log('logging error:', error);
    }, [error]);

    return (
        <Boundary labels={['./error.tsx']} color="pink">
            <div className="space-y-4">
                <h2 className="text-lg font-bold">Error</h2>
                <p className="text-sm">{error?.message}</p>

                <div>
                    <Button
                        className={clsx(
                            'rounded-lg px-3 py-1 text-sm font-medium bg-gray-700',
                            'text-gray-100 hover:bg-gray-500 hover:text-white'
                        )} onClick={() => reset()}>Try Again</Button>
                </div>
            </div>
        </Boundary>
    );
}

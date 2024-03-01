"use client"

import React, {useState} from 'react';
import clsx from "clsx";

const ReadMoreCollapse = ({className = "", text, read_more, hide,}: {
    className: string,
    text: string,
    read_more: string,
    hide: string
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleReadMore = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <div className="relative">
            <p className={clsx(
                "leading-5",
                className,
                isCollapsed && "line-clamp-2",
            )}>
                {text}
            </p>
            <div style={{
                background: 'linear-gradient(270deg, #000015 20.83%, rgba(0, 0, 21, 0) 100%)',
            }} className={
                clsx("w-full text-right", isCollapsed && "absolute bottom-0 ")
            }>
                <div className="text-secondary leading-5 text-xs" onClick={toggleReadMore}>
                    {isCollapsed ? read_more : hide}
                </div>
            </div>
        </div>
    )
}

export default ReadMoreCollapse;
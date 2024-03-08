import useInfiniteScroll from "react-infinite-scroll-hook";
import LazyLoading from "@/components/features/LazyLoading";
import React from "react";
import {useTranslations} from "next-intl";
import CenteredContainer from "@/components/ui/CenteredContainer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ScrollLoading = ({  isLoadingMore, isReachingEnd, setSize, size}: {
    isReachingEnd: boolean, isLoadingMore: boolean,
    setSize: (value: number) => void, size: number
}) => {
    // Drag and load
    // Infinite scroll with pull-to-refresh
    const [sentryRef] = useInfiniteScroll({
        loading: isLoadingMore,
        hasNextPage: !isReachingEnd, // Set to true if there are more pages to load
        onLoadMore: () => setSize(size + 1),
        rootMargin: '0px 0px 400px 0px', // Trigger the load more when reaching 400px from the bottom
    });

    if (isReachingEnd) return <div/>
    return (
        <div ref={sentryRef} className="mt-3">
            {isLoadingMore && <div className="h-15"><LazyLoading/></div>}
        </div>
    )
}

const InfiniteScroll = (
    {
          isReachingEnd, error, children, isLoadingMore, setSize, size,isEmpty,
    }: {
        isLoadingMore: boolean;
        children: React.ReactNode;
        error: Error | undefined;
        setSize: (value: number) => void;
        size: number;
        isEmpty: boolean;
        isReachingEnd: boolean;
    }) => {
    const trans = useTranslations()

    if (error) {
        return (
            <CenteredContainer>
                <Typography component="div" variant="caption">
                    {trans("errors.something_went_wrong_sorry")}
                </Typography>
            </CenteredContainer>
        )
    }

    if (isEmpty){
        return (
            <CenteredContainer>
                <Typography component="div" variant="caption">
                    {trans("common.no_more_data")}
                </Typography>
            </CenteredContainer>
        )
    }

    return (
        <React.Fragment>
            {children}
            <div className="mt-4">

                {isReachingEnd && (
                    <div className="w-full flex justify-center items-center py-4 ">
                        <Typography component="div" variant="caption">
                            {trans("common.no_more_data")}
                        </Typography>
                    </div>
                )}
                {(!isLoadingMore && !isReachingEnd) && (
                    <div className="text-center mt-5">
                        <IconButton className="animate-bounce" onClick={() => setSize(size + 1)} disabled={isLoadingMore}
                                    color="secondary" aria-label="loadmore">
                            <ArrowDownwardIcon/>
                        </IconButton>
                    </div>
                )}
                <ScrollLoading
                    isReachingEnd={isReachingEnd} setSize={setSize} size={size}
                    isLoadingMore={isLoadingMore}/>
            </div>
        </React.Fragment>
    )
}

export default InfiniteScroll;

import Image from "@/components/Image";

export function Loader() {
    return <div className="bg-primary h-screen flex justify-center items-center">
        <Image alt={"Alfamater auth loader"} src="/gifs/unicorn-low.gif"
            width={"100"} height={"100"} />
    </div>
}
import NextTopLoader, {NextTopLoaderProps} from "nextjs-toploader";

export default function ProgressBar({...props}: NextTopLoaderProps) {
    return <div className={"z=[99999]"}>
        <NextTopLoader
            color="#6d28d9"
            crawl
            easing="ease-in"
            // className={""}
            {...props}
        />
    </div>

}
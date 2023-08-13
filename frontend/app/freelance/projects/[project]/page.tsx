import projects from "@/jobs.json"
import {notFound} from "next/navigation";

interface IProp {
    params: {
        project: string
    }
}

export default function page({params}: IProp) {
    const project = projects.find((job) => job.id === params.project)
    if (!project) {
        notFound()
    }

    return <section>
        <div className={"p-5"}>
            <h2>
                {project?.title}
            </h2>
            <p>
                {project?.deadline}
            </p>

        </div>
    </section>
}
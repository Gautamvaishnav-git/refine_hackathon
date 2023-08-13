import {Button} from "@/components/ui/button";
import {Description} from "@radix-ui/react-dialog";
import {Bookmark} from "lucide-react";
import Link from "next/link";

interface CardProps {
    title: string;
    budget: number | string;
    projectId: string;
    category: string;
    status: boolean;
    deadline: string;
    description?: string;
    bids?: number;
}

const Card = ({title, description, budget, deadline, bids, projectId}: CardProps) => {
    return (
        <section className="p-5 h-52 rounded-lg bg-secondary shadow flex flex-col justify-between">
            <div className="flex items-start w-full justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <Button className="rounded-full p-2" variant={"outline"}>
                    <Bookmark className="ml-auto"/>
                </Button>
            </div>
            <p>
                {description ??
                    "Here, you can manage your client relationships and access relevant information. You can view a list of your clients, including their contact details, project history, and feedback ratings......"}
            </p>
            <div className="flex items-start justify-between">
                <div className="flex space-x-6">
                    <p>{budget}</p>
                    <p className="text-green-500">{bids ?? 9} bids</p>
                    <p>{new Date(deadline).toDateString()}</p>
                </div>
                <div>
                    <Link href={`/freelance/projects/${projectId}`} passHref>
                        <Button className="px-6">Bid</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Card;

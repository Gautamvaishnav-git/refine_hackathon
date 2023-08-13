import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link";
import BackButton from "@/app/freelance/projects/components/BackButton";


export default function NotFound() {
    return (
        <section className={"w-full h-screen fixed bg-primary/10 backdrop-blur-md top-0 z-[10001]"}>
            <Dialog open>
                <DialogContent className="sm:max-w-[425px] shadow z-[99999]">
                    <DialogHeader>
                        <DialogTitle>Not Found!</DialogTitle>
                        <DialogDescription className={"pt-4"}>
                            I think You are on a wrong page! go back and check if it correct page or not!
                        </DialogDescription>
                    </DialogHeader>
                    <div>

                    </div>
                    <DialogFooter>
                        <BackButton/>
                        <Link href={"/"} passHref>
                            <Button type="submit">Back To Home</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>

    )
}

import Link from "next/link";

export default function Header() {
    return <ul className={"flex items-center gap-4"}>
        <li><Link href={"/"}>Go to home</Link></li>
        <li><Link href={"/freelance/projects"}>Projects Page</Link></li>
        <li><Link href={"/"}>Profile</Link></li>
    </ul>
}
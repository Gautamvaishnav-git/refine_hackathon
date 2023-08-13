"use client";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import Login, {ILoginForm} from "../components/login";
import {toast} from "react-toastify";

const Page = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const login = async (loginData: ILoginForm) => {
        const {data, error} = await toast.promise(
            supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            }),
            {
                pending: "You are logging in...",
            }
        );
        if (error) {
            toast.error(error?.message);
        } else {
            toast.success("Logged in successfully!");
            router.refresh();
        }
    };

    return <Login login={login}/>;
};

export default Page;

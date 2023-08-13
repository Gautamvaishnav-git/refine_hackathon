import {Button} from "@/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel, Form, FormDescription} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";

const formSchema = z.object({
    email: z.string({required_error: "email is Required!"}),
    password: z.string({required_error: "Password is Required!"}),
});

export type ILoginForm = z.infer<typeof formSchema>;

const Login = ({login}: { login: (data: ILoginForm) => void }) => {
    const form = useForm<ILoginForm>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        login(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    className="w-full h-screen flex items-center justify-center bg-[url('/images/login.webp')] bg-cover">
                    <div className="max-w-7xl mx-auto">
                        <div
                            className="flex flex-col gap-3 bg-white/20 backdrop-blur-sm px-4 py-6 rounded sm:h-2/3 md:w-5/6 sm:w-1/2 border border-white/20">
                            <h1 className="text-3xl text-white font-bold text-left pb-4">Login to access
                                application.</h1>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-primary-foreground">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-transparent text-primary-foreground dark:border-primary-foreground/30"
                                                placeholder="email" type="email" {...field} />
                                        </FormControl>
                                        <FormDescription
                                            className={"text-secondary-foreground"}>
                                            {form?.formState?.errors?.email?.message}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-primary-foreground">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-transparent text-primary-foreground dark:border-primary-foreground/30"
                                                placeholder="password" type="password" {...field} />
                                        </FormControl>
                                        <FormDescription
                                            className={"text-secondary-foreground"}>
                                            {form?.formState?.errors?.password?.message}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button variant={"outline"}
                                    className="bg-transparent backdrop-blur-sm text-primary-foreground border-primary-foreground/20 dark:border-primary-foreground/30"
                                    type="submit">
                                Login
                            </Button>
                            <div className="flex items-center justify-between text-white">
                                <span>{"don't"} have an account?</span>
                                <Link href="/auth/signup">Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default Login;

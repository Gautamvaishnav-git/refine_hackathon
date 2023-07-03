"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

const signUpSchema = z.object({
  email: z.string({}).email(),
  password: z.string({}),
});

export type ISignUp = z.infer<typeof signUpSchema>;

const roles = [
  { value: "freelancer", label: "signup as a freelancer" },
  { value: "jobseeker", label: "signup as a jobseeker" },
  { value: "company", label: "signup as a employer" },
] as const;

const Signup = ({ signUp }: { signUp: (details: ISignUp) => void }) => {
  const form = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    signUp(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormDescription>Email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormDescription>Password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Signup;

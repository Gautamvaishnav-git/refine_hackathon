"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const signUpSchema = z
  .object({
    email: z.string({}).email(),
    password: z.string(),
  })
  .refine((values) => values.password.length >= 8, {
    message: "Password must contain at least 8 characters!",
    path: ["password"],
  });

export type ISignUp = z.infer<typeof signUpSchema>;

const Signup = ({ signUp }: { signUp: (details: ISignUp) => void }) => {
  const form = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    signUp(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full min-h-screen flex items-center justify-center px-2"
      >
        <div className="w-full mx-auto bg-secondary px-3 py-6 shadow-lg rounded space-y-4 border-2 border-primary/60">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default Signup;

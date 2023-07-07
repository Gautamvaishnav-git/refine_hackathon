"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import Datepicker from "react-tailwindcss-datepicker";
import DropDown from "@/app/shared/dropdown/Index";

const FormSchema = z.object({
  firstname: z.string({ required_error: "Firstname is required" }),
  dob: z.string({ required_error: "DOB is required" }),
  lastname: z.string().optional(),
  role: z.enum(["freelancer", "jobseeker", "company"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either freelancer | jobseeker | company",
  }),
});

export type IProfile = z.infer<typeof FormSchema>;

interface IProp {
  update: (data: IProfile) => void;
}

const ProfileUpdateForm = ({ update }: IProp) => {
  const form = useForm<IProfile>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: IProfile) => update(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-2/3 sm:px-0 px-3 space-y-6"
      >
        {/* firstname field */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Ram" {...field} />
              </FormControl>
              <FormDescription>Please Enter your firstname</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* lastname field */}
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Singh" {...field} />
              </FormControl>
              <FormDescription>Enter your lastname.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          {/* roles field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select A role</FormLabel>
                <FormControl>
                  <div className="w-full">
                    <DropDown<typeof field.value>
                      listType="Role"
                      onSelect={(value) => field.onChange(value)}
                      list={[
                        { value: "company", label: "company" },
                        { value: "freelancer", label: "freelancer" },
                        { value: "jobseeker", label: "jobseeker" },
                      ]}
                    />
                  </div>
                </FormControl>
                <FormDescription>What should we call you.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* dob field */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DOB</FormLabel>
                <FormControl>
                  {/* <Input type="date" placeholder="Ram" {...field} /> */}
                  <Datepicker
                    asSingle={true}
                    useRange={false}
                    popoverDirection="up"
                    value={{ endDate: field.value, startDate: field.value }}
                    onChange={(value) =>
                      field.onChange(String(value?.startDate))
                    }
                    startFrom={new Date("2002-05-01")}
                    maxDate={new Date()}
                    primaryColor={"blue"}
                    classNames={{
                      input(p) {
                        return "w-full h-10 border border-gray-300 rounded-md px-2 text-sm outline-none focus:border-primary";
                      },
                    }}
                    displayFormat="DD-MM-YYYY"
                  />
                </FormControl>
                <FormDescription>
                  Enter you DOB in the format YYYY-MM-DD
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;

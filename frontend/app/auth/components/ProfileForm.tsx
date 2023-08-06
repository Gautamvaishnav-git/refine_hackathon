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
import { User } from "@supabase/supabase-js";

const FormSchema = z.object({
  first_name: z.string({ required_error: "Firstname is required" }),
  dob: z.string({ required_error: "DOB is required" }),
  last_name: z.string().optional(),
  role: z.enum(["FREELANCER", "JOBSEEKER", "ORG"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either FREELANCER | JOBSEEKER | ORG",
  }),
  user_name: z.string({ required_error: "Username is required" }),
});

export type IProfile = z.infer<typeof FormSchema>;

interface IProp {
  update: (data: IProfile) => void;
  profileData?: IProfile | null;
}

const ProfileUpdateForm = ({ update, profileData }: IProp) => {
  const form = useForm<IProfile>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...profileData,
    },
  });

  const onSubmit = (data: IProfile) => update(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-2/3 sm:px-0 px-3 space-y-4"
      >
        {/* firstname field */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Ram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* lastname field */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Singh" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* lastname field */}
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="user name" {...field} />
              </FormControl>
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
                      listType="role"
                      onSelect={(value) => field.onChange(value)}
                      list={[
                        { value: "ORG", label: "organization" },
                        { value: "FREELANCER", label: "freelancer" },
                        { value: "JOBSEEKER", label: "jobseeker" },
                      ]}
                    />
                  </div>
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;

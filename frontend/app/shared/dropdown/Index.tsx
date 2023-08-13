"use client";

import { Link } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { List } from "lucide-react";

interface IProp<T extends string> {
  list: { value: T; text: string; id: string | number }[];
  field: any;
  placeholder: string;
  defaultValue?: string;
}

const DropDown = <T extends string>({ field, list, placeholder, defaultValue }: IProp<T>) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent defaultValue={defaultValue}>
        {list.map((item) => (
          <SelectItem key={item.id} value={item.value}>
            {item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;

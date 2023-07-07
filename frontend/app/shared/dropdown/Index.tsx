"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IProp<T extends string> {
  list: { value: T; label: string }[];
  onSelect: (value: T) => void;
  listType: string;
}

const DropDown = <T extends string>({ list, onSelect, listType }: IProp<T>) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<T | string>("" as T);

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        onSelect(value as T);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? list.find((item) => item.value === value)?.label
            : `Select a ${listType}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${listType}`} />
          <CommandEmpty>No {listType} found.</CommandEmpty>
          <CommandGroup>
            {list.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropDown;

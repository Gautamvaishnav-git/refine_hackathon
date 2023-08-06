import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { type ClassValue } from "clsx";

const Row = ({
  Icon,
  detailText,
  inputClasses,
}: {
  Icon: LucideIcon;
  detailText: string;
  inputClasses?: ClassValue[];
}) => {
  return (
    // create a profile page row
    <div
      className={cn(
        "flex w-full items-center justify-between",
        inputClasses && inputClasses
      )}
    >
      <Icon />
      <p className="text-sm">{detailText}</p>
    </div>
  );
};

export default Row;

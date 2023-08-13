"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

/**
 * @description **go back to previous page!**
 * @param {string} backText
 * */
const BackButton = ({backText}: { backText?: string }) => {
    const router = useRouter();
    return (
        <Button onClick={() => {
            router.back()
        }}>{backText ?? "Back"}</Button>
    );
};

export default BackButton;
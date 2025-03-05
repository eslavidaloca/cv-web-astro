"use client"

import { ChevronRight } from "lucide-react"
import React, { useRef, useEffect } from "react";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge }  from "@/components/ui/badge"

import "@/styles/animations/dialog.scss"
// import "@/styles/components/Card-dialog.scss"

interface DialogProps {
    title: string;
    fullDescription: string;
    technologies: string[];
    button?: React.ReactNode | undefined;
}

export default function CardDialog(props: DialogProps) {
    console.log(props.technologies);
    const dialogContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(dialogContentRef.current);
        if (dialogContentRef.current) {
            const contentRect = dialogContentRef.current.getBoundingClientRect();
            dialogContentRef.current.style.width = `${contentRect.width}px`;
            dialogContentRef.current.style.height = `${contentRect.height}px`;
            // console.log(contentRect.height);
            // console.log(contentRect.width);
        }
    }, [props.technologies, props.fullDescription, props.title]);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                variant="outline"
                className="triggerBtn rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                aria-label={props.button + " button"}
                >
                {props.button} <ChevronRight />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent ref={dialogContentRef} className="alertDialogContent mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <div className="flex flex-row justify-between p-2">
                        {props.technologies.map((tech, index) => (
                            <div className="px-1" key={index + "divs"}>
                                <Badge key={index} className="bg-accent text-accent-foreground text-xs rounded-md p-1">{tech}</Badge>
                            </div>
                        ))}
                    </div>
                    <AlertDialogDescription>
                        {props.fullDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-pointer">Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
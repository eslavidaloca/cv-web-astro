"use client"

import { ChevronRight } from "lucide-react"
import React, { useRef, useEffect, useState } from "react";

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
    const dialogContentRef = useRef<HTMLDivElement>(null);
    const badgesColsRef = useRef<HTMLDivElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // This is to ensure that the badges are displayed correctly in the dialog
    useEffect(() => {
        // Have to wait the minimum so it doesn't get a null reference
        setTimeout(() => {
            
            if (dialogOpen && dialogContentRef.current && badgesColsRef.current) {
                const techWidth = props.technologies.length * 100;
                const minWidth = Math.min(techWidth, 800);

                dialogContentRef.current.style.minWidth = `${minWidth}px`;
                
                if (props.technologies.length > 5) {
                    badgesColsRef.current.style.gridTemplateColumns = "repeat(6, 1fr)";
                } else {
                    badgesColsRef.current.style.gridTemplateColumns = "repeat(3, 1fr)";
                }
            }
        }, 1);

    }, [dialogOpen]);

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button
                variant="outline"
                className="triggerBtn rounded-md bg-card-foreground py-2 px-4 border border-transparent text-center text-sm text-card transition-all shadow-md hover:shadow-lg focus:bg-card focus:text-card-foreground focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                aria-label={props.button + " button"}
                >
                {props.button} <ChevronRight />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent ref={dialogContentRef} className="alertDialogContent min-w-fit">
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <div ref={badgesColsRef} className="grid p-2 space-y-2 space-x-2 justify-items-center">
                        {props.technologies.map((tech, index) => (
                            <div key={index + "divs"}>
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
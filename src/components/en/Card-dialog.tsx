"use client"

import { ChevronRight } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import "@/styles/animations/whatsapp-dialog.scss"

interface DialogProps {
    title: string;
    fullDescription: string;
    technologies: string[];
    button?: React.ReactNode | undefined;
}

export default function CardDialog(props: DialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                variant="outline"
                className="triggerBtn rounded-md bg-slate-800 py-2 px-4 transition-colorsborder border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                aria-label="whatsapp"
                >
                {props.button} <ChevronRight />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="alertDialogContent">
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.fullDescription}
                        <ul>
                            {props.technologies.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-pointer">Close</AlertDialogCancel>
                    {/* <AlertDialogAction asChild>
                        <a
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:bg-accent hover:cursor-pointer focus:bg-accent focus:text-accent-foreground rounded-md p-2"
                        aria-label="whatsapp link"
                        href="https://wa.me/523334436842"
                        >
                        Continue
                        </a>
                    </AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
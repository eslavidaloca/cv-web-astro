"use client"

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

import "@/styles/animations/dialog.scss"

interface DialogProps {
    icon?: React.ReactNode | undefined;
    className?: string;
    ariaLabel?: string;
    ariaLabelContinue?: string;
    title?: string;
    description?: string;
    target?: string;
    rel?: string;
    href?: string;
    onClick?: () => void;
}

export default function Modal({
        icon = null,
        className = "",
        ariaLabel = "",
        ariaLabelContinue = "Continue",
        title = "Modal Title",
        description = "Modal Description",
        target = "_blank",
        rel = "noreferrer",
        href = "",
        onClick = () => {},
    }: DialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                variant="ghost"
                className={className + "triggerBtn transition-colors hover:bg-accent hover:cursor-(--cursorPointer) hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"}
                aria-label={ariaLabel}
                >
                {icon}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="alertDialogContent">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-(--cursorPointer)">Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <a
                        target={target}
                        rel={rel}
                        className="transition-colors hover:bg-accent hover:cursor-(--cursorPointer) focus:bg-accent focus:text-accent-foreground rounded-md p-2"
                        aria-label={ariaLabelContinue}
                        href={href}
                        onClick={onClick}
                        >
                        Continue
                        </a>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
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

interface DialogProps {
    iconWhatsapp?: React.ReactNode | undefined;
}

export default function WhatsappDialog(props: DialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                variant="ghost"
                className="transition-colors hover:bg-accent hover:cursor-pointer hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
                aria-label="whatsapp"
                >
                {props.iconWhatsapp}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Proceed to whatsapp?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will take you to whatsapp so you can chat with me directly.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <a
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:bg-accent hover:cursor-pointer hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
                        aria-label="whatsapp link"
                        href="https://wa.me/523334436842"
                        >
                        Continue
                        </a>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
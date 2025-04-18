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
    iconWhatsapp?: React.ReactNode | undefined;
}

export default function WhatsappDialog(props: DialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                variant="ghost"
                className="triggerBtn transition-colors hover:bg-accent hover:cursor-(--cursorPointer) hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
                aria-label="whatsapp"
                >
                {props.iconWhatsapp}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="alertDialogContent">
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Proceder a whatsapp?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción te llevara a whatsapp donde podras chatear conmigo directamente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-(--cursorPointer)">Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <a
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:bg-accent hover:cursor-(--cursorPointer) focus:bg-accent focus:text-accent-foreground rounded-md p-2"
                        aria-label="Link de whatsapp"
                        href="https://wa.me/523334436842"
                        >
                        Continuar
                        </a>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
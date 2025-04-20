"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState, useEffect, useRef } from "react";
import { useDraggable, type DragOptions } from '@neodrag/react';

import { MoveDown } from 'lucide-react';
import { isDraggingNanoStore, draggingBookNanoStore, lectureListNanoStore } from "@/nanostores.ts"

import { type Drawer as DrawerInterface } from "@/interfaces/Drawer.ts";
import { type Book } from "@/interfaces/Book.ts";

import { Button } from "@/components/ui/button"

export default function DrawerComponent({ icon = "Open Drawer" }: DrawerInterface) {
    const [dragging, setDragging] = useState(isDraggingNanoStore.get());
    const [open, setOpen] = useState(false);
    const [mouseInsideDrawer, setMouseInsideDrawer] = useState(false);
    const [lectureList, setLectureList] = useState<Book[]>(lectureListNanoStore.get());

    let options: DragOptions = {
        gpuAcceleration: true,
        applyUserSelectHack: true,
        ignoreMultitouch: true,
        cancel: ".cancel-drag",
    };

    useEffect(() => {
        const unsubscribe = isDraggingNanoStore.subscribe((value) => {
            if (value) {
                setOpen(value);
                setDragging(value);
            }
            else {
                setOpen(value);
                setDragging(value);
            }

        });
        // Prevent memory leak
        return unsubscribe;
    }, []);

    useEffect(() => {
        const handleMouseUp = () => {
            if (mouseInsideDrawer && dragging) {
                const currentList: Book[] = lectureListNanoStore.get();
                const newBook = draggingBookNanoStore.get();
                if (newBook) {
                    const alreadyExists = currentList.some(book => book.ISBN === newBook.ISBN);
                    if (!alreadyExists) {
                        lectureListNanoStore.set([...currentList, newBook]);
                        setLectureList([...currentList, newBook]);
                    } else {
                        console.log("Este libro ya está en la lista:", newBook.title);
                    }
                }
                setMouseInsideDrawer(false);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [mouseInsideDrawer, dragging]);

    const handleMouseEnter = () => {
        if (dragging) {
            setMouseInsideDrawer(true);
        }
    };
    const handleMouseLeave = () => {
        if (dragging) {
            setMouseInsideDrawer(false);
        }
    };

    function DraggableBook({ book }: { book: Book }) {
        const draggableRef = useRef(null);
        useDraggable(draggableRef, options);

        return (
            <div
                ref={draggableRef}
                className="group relative max-w-30 p-1 bg-slate-dark-1100 dark:bg-white rounded-md hover:rounded-tl-none shadow-md"
            >
                <div
                    className="absolute -top-5 left-0 text-xs text-black bg-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-md rounded-br-md rounded-bl-none"
                >
                    Remove?
                </div>
                <img className="object-fit rounded cancel-drag" src={book.cover} alt={book.title} />
            </div>
        );
    }


    return (
        // This makes the books undraggable for some reason :(
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <Dialog> */}
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-(--cursorPointer) bg-slate-dark-1100 dark:bg-white hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500">{icon}</Button>
            </DialogTrigger>
            <DialogContent className="">
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ userSelect: 'auto' }} className="flex flex-col items-center justify-center">
                    <DialogHeader>
                        {dragging ? (
                            <DialogTitle className="text-center">
                                Want to add this book to your lecture list?
                            </DialogTitle>
                        ) : (
                            <DialogTitle className="text-center">
                                Personal lecture list
                            </DialogTitle>
                        )}

                        {dragging ? (
                            <DialogDescription className="flex flex-col items-center">
                                Drag it here
                                <span className="mt-6 text-neutral-100 dark:text-neutral-700 bg-slate-dark-1100 dark:bg-white p-2 rounded-full shadow-lg shadow-slate-dark-1100 dark:shadow-zinc-400/20 animate-bounce">

                                    <MoveDown strokeWidth={3} />
                                </span>
                            </DialogDescription>
                        ) : (
                            <DialogDescription className="text-center">
                                See all your added books
                            </DialogDescription>
                        )}
                    </DialogHeader>

                    {open && (
                        <div className="p-4 pb-0 w-full z-51">
                            <div className="flex items-center justify-center space-x-4">
                                {lectureList.length > 0 ? (
                                    lectureList.map((book, index) => (
                                        <DraggableBook key={index} book={book} />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center w-full p-2 bg-slate-dark-1100 dark:bg-white rounded-md shadow-md mb-2">
                                        <span className="text-sm text-neutral-100 dark:text-neutral-700">
                                            No books added yet
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </DialogContent>
        </Dialog>
    )

}
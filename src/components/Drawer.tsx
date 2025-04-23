"use client"
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
    const [helperFlag, setHelperFlag] = useState(false);
    
    const draggingLocalRef = useRef(false);
    const drawerRef = useRef<HTMLDivElement | null>(null);

    console.log("Lecture list from drawer beginning: ", JSON.stringify(lectureListNanoStore.get()));

    let optionsReact: DragOptions = {
        gpuAcceleration: true,
        applyUserSelectHack: true,
        ignoreMultitouch: true,
        cancel: ".cancel-drag",

        // onDragStart is defined in the DraggableBook component bc it needs the current ref for getting the book
        
        onDragEnd: () => {
            draggingLocalRef.current = false;
            const drawerRect = drawerRef.current?.getBoundingClientRect();
            const { clientX, clientY } = window.event as MouseEvent;

            if (!drawerRect) {console.log("No drawer rect"); return;}

            const insideDrawer =
                clientX >= drawerRect.left &&
                clientX <= drawerRect.right &&
                clientY >= drawerRect.top &&
                clientY <= drawerRect.bottom;

            if (insideDrawer) {
                setMouseInsideDrawer(true);
                setHelperFlag(false);
            }
            else {
                setMouseInsideDrawer(false);
                setHelperFlag(true);
            }
        }
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
            const newBook = draggingBookNanoStore.get();
            if(!newBook) return; // No book is being dragged

            const currentList: Book[] = lectureListNanoStore.get();
            
            // Wants to add the book to the lecture list
            if (mouseInsideDrawer && dragging) {
                const alreadyExists = currentList.some(book => book.ISBN === newBook.ISBN);
                if (!alreadyExists) {
                    lectureListNanoStore.set([...currentList, newBook]);
                    setLectureList([...currentList, newBook]);
                    console.log("A ver la lista desde adentro ", JSON.stringify(lectureListNanoStore.get()));
                } else {
                    console.log("Este libro ya está en la lista:", newBook.title);
                }
            }
            // Wants to remove the book from the lecture list
            else if (!mouseInsideDrawer && helperFlag) {
                const updatedList = currentList.filter(book => book.ISBN !== newBook.ISBN);
                lectureListNanoStore.set(updatedList);
                setLectureList(updatedList);
                
                setMouseInsideDrawer(false);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [mouseInsideDrawer, dragging, helperFlag]);

    const handleMouseEnter = () => {
        setMouseInsideDrawer(true);
    };
    const handleMouseLeave = () => {
        setMouseInsideDrawer(false);
    };

    function DraggableBook({ book }: { book: Book }) {
        const draggableRef = useRef(null);
        useDraggable(draggableRef, {...optionsReact,
            onDragStart: () => {
                draggingLocalRef.current = true;
                draggingBookNanoStore.set(book);
            },
        });

        return (
            <div
                ref={draggableRef}
                className="group relative max-w-30 p-1 bg-slate-dark-1100 dark:bg-white rounded-md hover:rounded-tl-none shadow-md touch-none"
            >
                <div
                    className="absolute -top-5 left-0 text-xs text-neutral-100 dark:text-neutral-700 bg-slate-dark-1100 dark:bg-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-md rounded-br-md rounded-bl-none"
                >
                    Remove
                </div>
                <img className="object-fit rounded cancel-drag" src={book.cover} alt={book.title} />
                <button
                    onClick={() => {
                        alert("Book details clicked!");
                    }}
                    className="absolute -bottom-5 right-0 cancel-drag text-xs text-neutral-100 dark:text-neutral-700 bg-slate-dark-1100 dark:bg-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-md rounded-br-md rounded-bl-none"
                >
                    Details
                </button>
            </div>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-(--cursorPointer) bg-slate-dark-1100 dark:bg-white hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500">{icon}</Button>
            </DialogTrigger>
            <DialogContent className="">
                <div ref={drawerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ userSelect: 'none' }} className="flex flex-col items-center justify-center">
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
                                <AnimatePresence mode="popLayout">
                                    {lectureList.length > 0 ? (
                                        lectureList.map((book) => (
                                            <motion.div
                                                layout
                                                key={book.ISBN}
                                                initial={{ opacity: 0, scale: 0.95, x: -1000, transition: { duration: 0.5 } }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, y: -1000, transition: { duration: 0.5, ease: "easeInOut" } }}
                                            >
                                                <DraggableBook book={book} />
                                            </motion.div>
                                        ))
                                    ) : !dragging && (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: -1000, transition: { duration: 0.5 } }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            className="flex items-center justify-center p-2 bg-slate-dark-1100 dark:bg-white rounded-md shadow-md mb-2"
                                        >
                                            <span className="text-sm text-neutral-100 dark:text-neutral-700">
                                                No books added yet
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
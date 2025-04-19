"use client"
import { useState, useEffect } from "react";
// import { Minus, Plus } from "lucide-react"
import { MoveDown } from 'lucide-react';
import { isDraggingNanoStore, draggingBookNanoStore, lectureListNanoStore } from "@/nanostores.ts"

import { type Drawer as DrawerInterface } from "@/interfaces/Drawer.ts";
import { type Book } from "@/interfaces/Book.ts";

// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerComponent({ icon = "Open Drawer" }: DrawerInterface) {
    const [dragging, setDragging] = useState(isDraggingNanoStore.get());
    const [open, setOpen] = useState(false);
    const [mouseInsideDrawer, setMouseInsideDrawer] = useState(false);
    // const [doubting, setDoubting] = useState(false);

    useEffect(() => {
        // isDraggingNanoStore.set(value);
        const unsubscribe = isDraggingNanoStore.subscribe((value) => {
            if (value) {
                setOpen(value);
                setDragging(value);
            }
            else{
                setOpen(value);
                setDragging(value);
            }
            
        });
        // Prevent memory leak
        return unsubscribe;
    // }, [value]);
    }, []);

    useEffect(() => {
        const handleMouseUp = () => {
            if (mouseInsideDrawer && dragging) {
                const lectureList: string[] = lectureListNanoStore.get();
                // lectureList.push(draggingBookNanoStore.get()?.title as string);
                lectureListNanoStore.set([...lectureList, draggingBookNanoStore.get()!.title]);
                console.log("Lecture List: ", lectureList);
                console.log("Lecture List en nanostore: ", lectureListNanoStore.get());
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

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="cursor-(--cursorPointer) bg-slate-dark-1100 dark:bg-white hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500">{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            {dragging ? (
                                <DrawerTitle className="text-center">
                                    Want to add this book to your lecture list?
                                </DrawerTitle>
                                ) : (
                                <DrawerTitle className="text-center">
                                    Personal lecture list
                                </DrawerTitle>
                            )}

                            {dragging ? (
                                <DrawerDescription className="flex flex-col items-center">
                                        Drag it here 
                                        <span className="mt-6 text-neutral-100 dark:text-neutral-700 bg-slate-dark-1100 dark:bg-white p-2 rounded-full shadow-lg shadow-slate-dark-1100 dark:shadow-zinc-400/20 animate-bounce">

                                            <MoveDown strokeWidth={3} />
                                        </span>
                                </DrawerDescription>
                                ) : (
                                <DrawerDescription className="text-center">
                                    See all your added books
                                </DrawerDescription>
                            )}
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                {/* Books go here */}
                            </div>
                            <div className="mt-3 h-[120px]">
                            </div>
                        </div>
                        {/* <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter> */}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

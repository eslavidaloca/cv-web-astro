"use client"
import { useState, useEffect } from "react";
// import { Minus, Plus } from "lucide-react"
import { type Drawer as DrawerInterface } from "@/interfaces/Drawer.ts";
import { isDraggingNanoStore } from "@/nanostores.ts"
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

    // function onClick(adjustment: number) {
    //     setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    // }

    useEffect(() => {
        // isDraggingNanoStore.set(value);
        const unsubscribe = isDraggingNanoStore.subscribe((value) => {
            if (value) {
                setOpen(true);
            }
            else{
                setOpen(false);
            }
            
        });
        // Prevent memory leak
        return unsubscribe;
    // }, [value]);
    }, []);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="cursor-(--cursorPointer) bg-slate-dark-1100 dark:bg-white hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500">{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Lecture list</DrawerTitle>
                        <DrawerDescription className="text-center">See all your books in your lecture list.</DrawerDescription>
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
            </DrawerContent>
        </Drawer>
    )
}

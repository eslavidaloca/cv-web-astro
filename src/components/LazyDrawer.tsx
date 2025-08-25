"use client";

import React, { useState, Suspense, useEffect } from "react";
import { isDraggingNanoStore } from "@/nanostores";

const Drawer = React.lazy(() => import("./Drawer"));
import DrawerLite from "./DrawerLite";

import { type Drawer as DrawerInterface } from "@/interfaces/Drawer.ts";

export default function DrawerLazyWrapper({ icon = "Open Drawer" }: DrawerInterface) {
    const [loaded, setLoaded] = useState(false);
    const [dragging, setDragging] = useState(isDraggingNanoStore.get());

    useEffect(() => {
        const unsubscribe = isDraggingNanoStore.subscribe((value) => {
            if(value && !loaded) setLoaded(true);
            setDragging(value);
        });
        // Prevent memory leak
        return unsubscribe;
    }, []);

    return (
        <>
        {!loaded && <DrawerLite icon={icon} onClick={() => setLoaded(true)} />}
        {loaded && (
            <Suspense fallback={<p>Cargando Drawer...</p>}>
                <Drawer icon={icon} forceOpenOnMount />
            </Suspense>
        )}
        </>
    );
}

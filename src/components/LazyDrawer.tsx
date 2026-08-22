"use client";

import React, { useState, Suspense, useEffect } from "react";
import { isDraggingNanoStore } from "@/nanostores";

const Drawer = React.lazy(() => import("./Drawer"));
import DrawerLite from "./DrawerLite";

import { type Drawer as DrawerInterface } from "@/interfaces/Drawer.ts";
import { shouldOpenDrawerOnMount } from "@/lib/lazy-drawer";

export default function DrawerLazyWrapper({ icon = "Open Drawer" }: DrawerInterface) {
    const [loaded, setLoaded] = useState(false);
    const [dragging, setDragging] = useState(isDraggingNanoStore.get());
    const [shouldOpenOnMount, setShouldOpenOnMount] = useState(false);

    // Preload Drawer chunk on mount so drag-to-add cannot race the lazy import.
    useEffect(() => {
        import("./Drawer").then(() => setLoaded(true));
    }, []);

    useEffect(() => {
        const unsubscribe = isDraggingNanoStore.subscribe((value) => {
            setDragging(value);
            if (value) {
                setShouldOpenOnMount(shouldOpenDrawerOnMount(true, false));
                setLoaded(true);
            }
        });
        return unsubscribe;
    }, []);

    const openDrawer = () => {
        setShouldOpenOnMount(shouldOpenDrawerOnMount(false, true));
        setLoaded(true);
    };

    return (
        <>
        {!loaded && <DrawerLite icon={icon} onClick={openDrawer} />}
        {loaded && (
            <Suspense fallback={<DrawerLite icon={icon} onClick={openDrawer} />}>
                <Drawer icon={icon} forceOpenOnMount={shouldOpenOnMount} />
            </Suspense>
        )}
        </>
    );
}

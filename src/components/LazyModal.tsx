"use client"
import React, { useState, Suspense } from "react";

export default function LazyModal(props: any) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
        <button
            aria-label={props.ariaLabel}
            onClick={handleOpen}
            className="triggerBtn transition-colors hover:bg-accent"
        >
            {props.icon}
        </button>

        {open && (
            <Suspense fallback={<div>Cargando...</div>}>
            <DynamicModal {...props} onClose={() => setOpen(false)} />
            </Suspense>
        )}
        </>
    );
}

const DynamicModal = React.lazy(() => import("./Modal"));

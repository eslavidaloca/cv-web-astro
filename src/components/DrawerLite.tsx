import { Button } from "@/components/ui/button"

interface DrawerLiteProps {
    onClick: () => void;
    icon: React.ReactNode | undefined;
}

export default function DrawerLite({ onClick, icon }: DrawerLiteProps) {
    return (
        <Button variant="outline" className="cursor-(--cursorPointer) bg-slate-dark-1100 dark:bg-white hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500" onClick={onClick}>
            {icon}
        </Button>
    );
}

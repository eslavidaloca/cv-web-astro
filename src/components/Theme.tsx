import { Theme, ThemePanel } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import '@styles/components/ThemePanel.scss';

export default function Tema({ children }: { children: React.ReactNode }) {
    return (
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            <div className="mt-2 bottom-1 right-0 p-4">
                {children}

                <ThemePanel className="border border-red-300 rounded-md theme-panel" />
            </div>
        </Theme>
    );
}
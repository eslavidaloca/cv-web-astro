"use client";

import { Theme, ThemePanel } from "@radix-ui/themes";
import '@styles/components/ThemePanel.scss';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	return (
        <Theme
        accentColor="mint"
        grayColor="olive"
        panelBackground="translucent"
        >
            {children}
            <ThemePanel className="border border-red-300 rounded-md theme-panel"/>
        </Theme>
	);
}
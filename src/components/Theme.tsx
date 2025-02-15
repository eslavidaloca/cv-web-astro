import { Theme } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

export default function Tema({ children }: { children: React.ReactNode }) {
    return (
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            {/* {children} */}
            {/* <ThemePanel /> */}
        </Theme>
    );
}
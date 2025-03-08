import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/magicui/terminal";

export default function TerminalComponent() {
    return (
        <Terminal className="bg-olive-100 dark:bg-gray-900">
            <TypingAnimation>&gt; cd /var/www/eslavi-cv/deploy</TypingAnimation>
            <TypingAnimation delay={1800}>&gt; npm run build:prod</TypingAnimation>

            <AnimatedSpan delay={3200} className="text-green-700 dark:text-green-500">
            <span>✔ Preflight checks.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={3700} className="text-green-700 dark:text-green-500">
            <span>✔ Verifying framework. Found Astro.build.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={4200} className="text-green-700 dark:text-green-500">
            <span>✔ Validating Tailwind CSS.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={4700} className="text-green-700 dark:text-green-500">
            <span>✔ Validating import alias.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={5200} className="text-green-700 dark:text-green-500">
            <span>✔ Writing components.json.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={5700} className="text-green-700 dark:text-green-500">
            <span>✔ Checking registry.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={6200} className="text-green-700 dark:text-green-500">
            <span>✔ Updating tailwind.config.ts</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={6700} className="text-green-700 dark:text-green-500">
            <span>✔ Updating app/globals.css</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={7200} className="text-green-700 dark:text-green-500">
            <span>✔ Installing dependencies.</span>
            </AnimatedSpan>
    
            <AnimatedSpan delay={7700} className="text-blue-700 dark:text-blue-500">
            <span>ℹ Updated 1 file:</span>
            <span className="pl-2">- lib/utils.ts</span>
            </AnimatedSpan>
    
            <TypingAnimation delay={8200} className="text-muted-foreground">
            Success! Project build completed.
            </TypingAnimation>
    
        </Terminal>
    );
}

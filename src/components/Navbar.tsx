"use client"

import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

import "@styles/components/Navbar.scss"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function Navbar() {
  const [theme, setTheme] = React.useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  React.useEffect(() => {
    document.body.className = theme;
    document.getElementById("theme-icon")?.setAttribute("src", theme === "light" ? "src/assets/icons/moon.svg" : "src/assets/icons/sun.svg");
  }, [theme]);

  return (
    <div className="flex row justify-between items-center py-2 space-x-4 navbar">
      <div className="flex row ml-3 space-x-4">
        <span className="font-bold ml-3">
          Jonathan <span className="text-green-500">Eslavi</span> Medina Dávila
        </span>
        <p>
          Fullstack Developer
        </p>
      </div>
      <NavigationMenu className="NavigationMenuRoot">
        <NavigationMenuList className="NavigationMenuList">

          <NavigationMenuItem>
            <NavigationMenuTrigger>Professional Experience</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <img className="ml-0" src="src/assets/icons/thermometer.svg" alt="Timeline icon"/>
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Timeline
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        See my professional experience and projects throughout my career.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Current work">
                  Systems specialist <span className="text-green-500">@</span>Secretary of Administration
                </ListItem>
                <ListItem href="/docs/installation" title="Previous works">
                  Previous works
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Side Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {/* <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link> */}
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Skills</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/skills/frontend"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Frontend knowledge
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Frontend frameworks, libraries, and tools used overall my experience.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-50 w-50 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/skills/backend"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <div className="mb-2 mt-4 text-lg font-medium">
                      Backend knowledge
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Backend, databases, and any language used as a backend for projects.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {/* <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem> */}
                <ListItem href="/skills/deploy" title="Deploy knowledge" className="bg-gradient-to-b from-muted/50 to-muted">
                  My whole experience with deploying, OS and tools.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="https://github.com/eslavidaloca">
            <a href="https://github.com/eslavidaloca"><img src="src/assets/icons/github.svg" alt="Contact me through a github link"/></a>
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="https://linkedin.com/in/eslavi">
            <a href="https://linkedin.com/in/eslavi"><img src="src/assets/icons/linkedin.svg" alt="Contact me through a linkedin link"/></a>
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle() + "hover:cursor-pointer"} onClick={toggleTheme}>
            <img id="theme-icon" src="src/assets/icons/sun.svg" alt="Change theme"/>
          </NavigationMenuLink>


        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

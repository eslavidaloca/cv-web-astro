"use client"

import * as React from "react"

import { NavigationMenu } from "radix-ui";
import { useChangeTheme } from "@/hooks/change-theme";

import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

import "@styles/components/Navbar.scss"
import { useState } from "react";
import type { ToasterProps } from "sonner";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "BlueXolo",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Social Service web page",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  // {
  //   title: "Progress",
  //   href: "/docs/primitives/progress",
  //   description:
  //     "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  // },
  // {
  //   title: "Scroll-area",
  //   href: "/docs/primitives/scroll-area",
  //   description: "Visually or semantically separates content.",
  // },
  // {
  //   title: "Tabs",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
]

interface NavbarProps {
  iconTimeline?: React.ReactNode | undefined;
  iconFront?: React.ReactNode | undefined;
  iconBack?: React.ReactNode | undefined;
}

export default function Navbar(props: NavbarProps) {
  const [theme, setTheme] = useState<ToasterProps["theme"]>("dark");

  useChangeTheme(setTheme);
  return (
    <div className="flex row justify-between items-center py-2 space-x-4">
      <NavigationMenu.Root className="NavigationMenuRoot group/navigation-menu relative flex max-w-max flex-1 items-center justify-center">
        <NavigationMenu.List className="NavigationMenuList">

          <NavigationMenu.Item>
            <NavigationMenuTrigger>Professional Experience</NavigationMenuTrigger>
            <NavigationMenuContent className="NavigationMenuContent">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] List one">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="Callout flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/work/timeline"
                    >
                      {props.iconTimeline}
                      <div className="CalloutHeading mb-2 mt-4 text-lg font-medium">
                        Timeline
                      </div>
                      <p className={"text-sm leading-tight CalloutText-"+(theme)}>
                        See my professional experience and projects throughout my career.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-50 w-50 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/work"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                      <img src="/src/assets/isologo_headerfoot.png" alt="Current Work logo" className="mb-3"/>
                      Current work
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                      Systems specialist <span className="text-green-500">@</span> Secretary of Administration
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/work/previous" title="Previous work">
                  List of all my previous jobs.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger>Side Projects</NavigationMenuTrigger>
            <NavigationMenuContent className="NavigationMenuContent">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-rows-2 lg:w-[600px] List">
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
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger>Skills</NavigationMenuTrigger>
            <NavigationMenuContent className="NavigationMenuContent">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="Callout flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/skills/frontend"
                    >
                      {props.iconFront}
                      <div className="CalloutHeading mb-2 mt-4 text-lg font-medium">
                        Frontend
                      </div>
                      <p className={"text-sm leading-tight CalloutText-"+(theme)}>
                        Languages, frameworks, libraries, and tools used within my experience.
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
                      {props.iconBack}
                      <div className="mb-0 mt-2 text-lg font-medium">
                      Backend
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        This includes databases and frameworks.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/skills/deploy" title="Deploying" className="bg-gradient-to-b from-muted/50 to-muted">
                  My whole experience with deploying, OS and tools.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className={"Arrow-"+(theme)}></div>
				</NavigationMenu.Indicator>

        </NavigationMenu.List>

        <div className="ViewportPosition">
          <NavigationMenuViewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
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
      </NavigationMenu.Link>
    </li>
  )
})
ListItem.displayName = "ListItem"
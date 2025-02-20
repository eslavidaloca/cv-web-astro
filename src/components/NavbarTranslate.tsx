"use client"

import * as React from "react"

import { NavigationMenu } from "radix-ui";

import {
  // NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuIndicator,
  NavigationMenuViewport
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

import "@styles/components/NavbarTranslate.scss"

const langs: { title: string; short: string}[] = [
  {
    title: "English",
    short: "en"
  },
  {
    title: "Español",
    short: "es"
  }
]

interface NavbarTranslateProps {
  lang: string;
  currentPath: string;
  iconLang?: React.ReactNode | undefined;
  iconUsa?: React.ReactNode | undefined;
  iconMx?: React.ReactNode | undefined;
}

export default function NavbarTranslate(props: NavbarTranslateProps) {

  return (
    <div className="flex row justify-between items-center py-2 space-x-4">
      <NavigationMenu.Root className="NavigationMenuRoot group/navigation-menu relative flex max-w-max flex-1 items-center justify-center">
        <NavigationMenu.List className="NavigationMenuList">

          <NavigationMenu.Item>
            <NavigationMenuTrigger>
              {props.iconLang}
              {props.lang === "en" ? langs[0].title : langs[1].title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="NavigationMenuContent">
              <ul className="row w-[140px] items-center">
                {langs.map((lang) => (
                  lang.short !== props.lang && (
                    <ListItem
                      key={lang.title}
                      title={lang.title}
                      href={props.lang === "en" ? `/es${props.currentPath}` : `${props.currentPath}`}
                      icon={props.lang === "en" ? props.iconMx : props.iconUsa}
                    >
                    </ListItem>
                  )
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenu.Item>

        {/* <NavigationMenu.Indicator className="NavigationMenuIndicator">
					<div className="Arrow" />
				</NavigationMenu.Indicator> */}

        </NavigationMenu.List>

        <div className="ViewportPosition">
          <NavigationMenuViewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<React.ComponentRef<"a">, ListItemProps>(
  ({ className, title, icon, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenu.Link asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-2 rounded-md pt-3 pb-3 pl-3 pr-2 m-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              {icon && <div>{icon}</div>}
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>

            </div>
          </a>
        </NavigationMenu.Link>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
"use client"

import * as React from "react"

import { NavigationMenu } from "radix-ui";
import { useChangeThemeReverse } from "@/hooks/change-theme";

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
import { type Navbar } from "@/interfaces/Navbar.ts";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "BlueXolo",
    href: "/es/side-projects/bluexolo",
    description:
      "Un framework de código abierto creado por IBM.",
  },
  {
    title: "Página web del servicio social",
    href: "/es/side-projects/social-service",
    description:
      "Se contribuyo en el desarrollo de una pagina web donde mi servicio social estuvo involucrado.",
  },
  {
    title: "Esta página web de mi CV",
    href: "/es/side-projects/cv",
    description:
      "Demostración de mi trabajo profesional y habilidades utilizando mi framework favorito Astro.",
  }
]

export default function Navbar(props: Navbar) {
  const [theme, setTheme] = useState<ToasterProps["theme"]>("dark");

  useChangeThemeReverse(setTheme);
  return (
    <div className="flex row justify-between items-center py-2">
      <NavigationMenu.Root className="NavigationMenuRoot group/navigation-menu relative flex max-w-max flex-1 items-center justify-center">
        <NavigationMenu.List className="NavigationMenuList gap-1">

          <NavigationMenu.Item>
            <NavigationMenuTrigger className="NavigationMenuTrigger">Experiencia Profesional</NavigationMenuTrigger>
            <NavigationMenuContent className="NavigationMenuContent">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] List one">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="CalloutTimeline flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="es/work/timeline"
                    >
                      {props.iconTimeline}
                      <div className="CalloutHeading mb-2 mt-4 text-lg font-medium">
                        Linea del Tiempo
                      </div>
                      <p className={"text-sm leading-tight CalloutText-"+(theme)}>
                        Mira mi experiencia profesional y proyectos a lo largo de mi carrera.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-50 w-50 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/es/work"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                      <img src="/isologo_headerfoot.webp" alt="Current Work logo" className="mb-3"/>
                      Trabajo Actual
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                      Especialista en sistemas <span className="text-green-500">en</span> Secretaría de Administración.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/es/work/previous" title="Trabajos Previos" className="bg-gradient-to-b from-muted/50 to-muted">
                  Lista de todos mis trabajos previos.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger className="NavigationMenuTrigger">Projectos Secundarios</NavigationMenuTrigger>
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
            <NavigationMenuTrigger className="NavigationMenuTrigger">Habilidades</NavigationMenuTrigger>
            <NavigationMenuContent className="NavigationMenuContent">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="Callout flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/es/skills/frontend"
                    >
                      {props.iconFront}
                      <div className="CalloutHeading mb-2 mt-4 text-lg font-medium">
                        Frontend
                      </div>
                      <p className={"text-sm leading-tight CalloutText-"+(theme)}>
                        Lenguajes, frameworks y utilidades utilizadas en mi experiencia profesional.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-50 w-50 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/es/skills/backend"
                    >
                      {props.iconBack}
                      <div className="mb-0 mt-2 text-lg font-medium">
                      Backend
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Aqui se incluyen bases de datos, lenguajes y frameworks.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/es/skills/deploy" title="Desplegar" className="bg-gradient-to-b from-muted/50 to-muted">
                  Toda mi experiencia con desplegar paginas, sistemas operativos y herramientas.
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
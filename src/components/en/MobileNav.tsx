"use client"

import * as React from "react"
import { Globe, Mail, MessageCircle } from "lucide-react"
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import ThemeToggle from "@/components/ThemeToggle"
import { sideProjects } from "@/data/components/navbar-sideProjects"
import "@styles/components/MobileNav.scss"

const workLinks = [
  { title: "Timeline", href: "/work/timeline" },
  { title: "Current work", href: "/work" },
  { title: "Previous work", href: "/work/previous" },
]

const skillLinks = [
  { title: "Frontend", href: "/skills/frontend" },
  { title: "Backend", href: "/skills/backend" },
  { title: "Deploying", href: "/skills/deploy" },
]

interface MobileNavProps {
  lang: string
  currentPath: string
}

function GithubIcon() {
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.68-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function MobileNav({ lang, currentPath }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  const otherLang = lang === "en"
    ? { title: "Español", href: `/es${currentPath}` }
    : { title: "English", href: currentPath }

  const copyEmail = () => {
    navigator.clipboard.writeText("eslavi_jonhas@hotmail.com")
    toast("Email copied to clipboard!", {
      description: new Date().toLocaleTimeString(),
    })
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="mobile-nav-trigger"
        aria-label="Open navigation menu"
      >
        <span className="hamburger-icon" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </SheetTrigger>

      <SheetContent
        side="right"
        belowNav
        showClose={false}
        className="mobile-nav-sheet gap-0"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <nav className="mobile-nav-links flex flex-col gap-4 px-2">
          <div className="mobile-nav-section">
            <span className="mobile-nav-section-title">Professional Experience</span>
            {workLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-sub-link"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </a>
            ))}
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-section-title">Side Projects</span>
            <a
              href="/side-projects/"
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              All side projects
            </a>
            {sideProjects
              .filter((project) => project.title !== "See more...")
              .map((project) => (
                <a
                  key={project.href}
                  href={project.href}
                  className="mobile-nav-sub-link"
                  onClick={() => setOpen(false)}
                >
                  {project.title}
                </a>
              ))}
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-section-title">Skills</span>
            {skillLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-sub-link"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="mobile-nav-footer">
          <div className="mobile-nav-footer-icons">
            <a
              href={otherLang.href}
              className="mobile-nav-footer-btn"
              aria-label={`Switch to ${otherLang.title}`}
              onClick={() => setOpen(false)}
            >
              <Globe className="size-[22px]" strokeWidth={2} />
            </a>
            <a
              href="https://github.com/eslavidaloca"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-footer-btn"
              aria-label="GitHub profile"
              onClick={() => setOpen(false)}
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/eslavi/"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-footer-btn"
              aria-label="LinkedIn profile"
              onClick={() => setOpen(false)}
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://wa.me/523334436842"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-footer-btn"
              aria-label="WhatsApp"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="size-[22px]" strokeWidth={2} />
            </a>
            <button
              type="button"
              className="mobile-nav-footer-btn"
              aria-label="Copy email to clipboard"
              onClick={copyEmail}
            >
              <Mail className="size-[22px]" strokeWidth={2} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

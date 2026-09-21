"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { brand, nav } from "@/lib/content";

const SECTION_IDS = ["ai", "fullstack", "engage"] as const;

function idFromHref(href: string) {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return "";
}

function headerOffset() {
  const header = document.querySelector(".header");
  return (header instanceof HTMLElement ? header.getBoundingClientRect().height : 72) + 20;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = window.scrollY + el.getBoundingClientRect().top - headerOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function readActiveHash() {
  if (window.scrollY < window.innerHeight * 0.4) return "";
  const probe = headerOffset() + 24;
  let current = "";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= probe) current = `#${id}`;
  }
  return current;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const lockRef = useRef(false);
  const lockTimer = useRef(0);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const initial = window.location.hash.slice(1);
    if (initial && SECTION_IDS.includes(initial as (typeof SECTION_IDS)[number])) {
      lockRef.current = true;
      requestAnimationFrame(() => scrollToSection(initial));
      setActiveHash(`#${initial}`);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    } else {
      setActiveHash(readActiveHash());
    }

    const onScroll = () => {
      if (lockRef.current) return;
      setActiveHash(readActiveHash());
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  function lockSpy(hash: string) {
    lockRef.current = true;
    setActiveHash(hash);
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      lockRef.current = false;
      setActiveHash(readActiveHash());
    }, 800);
  }

  function onNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);

    if (href === "/" && pathname === "/") {
      event.preventDefault();
      window.history.pushState(null, "", "/");
      lockSpy("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = idFromHref(href);
    if (id && pathname === "/") {
      event.preventDefault();
      window.history.pushState(null, "", `#${id}`);
      lockSpy(`#${id}`);
      scrollToSection(id);
    }
  }

  function isCurrent(href: string) {
    if (href === "/contact") return pathname === "/contact";
    if (pathname !== "/") return false;
    if (href === "/") return activeHash === "";
    return href === `/${activeHash}`;
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={(event) => onNavClick(event, "/")}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-copy">
            <span className="brand-zh">{brand.name}</span>
            <span className="brand-en">{brand.english}</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`menu-icon${open ? " open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav id="site-nav" className={`nav${open ? " open" : ""}`}>
          {nav.map((item) => {
            const isCta = item.href === "/contact";
            const current = isCurrent(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isCta ? "nav-cta" : "nav-link"}
                aria-current={current ? "page" : undefined}
                onClick={(event) => onNavClick(event, item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

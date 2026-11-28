"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SmartLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

/**
 * Navigation-aware link that handles same-page clicks cleanly:
 * - Highlights & exposes `aria-current="page"` when active
 * - Smooth-scrolls back to top when clicking a non-hash link to the current route
 * - Lets hash links (`/#services`, `/about#team`) scroll to their anchor naturally
 */
export default function SmartLink({
  href,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  onClick,
  children,
  ...rest
}: SmartLinkProps) {
  const pathname = usePathname();
  const hasHash = href.includes("#");
  const isCurrent = !hasHash && pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && isCurrent) {
      e.preventDefault();
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  const stateClass = isCurrent ? activeClassName : inactiveClassName;
  const combinedClassName = [className, stateClass].filter(Boolean).join(" ");

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={handleClick}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </Link>
  );
}

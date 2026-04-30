"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/colleges", label: "Explore" },
    { href: "/compare", label: "Compare" },
    { href: "/predictor", label: "Predictor" },
    { href: "/discussions", label: "Discussions" },
    { href: "/saved", label: "Saved" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="w-40">
            <Link href="/" className="text-2xl font-black text-primary flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="bg-primary/10 p-2 rounded-xl text-primary"
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm group-hover:opacity-80 transition-opacity">
                EduNexus
              </span>
            </Link>
          </div>

          {/* Nav Links - Center */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="relative group">
                <span className={`text-base font-bold transition-all ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70 group-hover:text-primary"
                }`}>
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Placeholder - Right (Balances the Logo) */}
          <div className="hidden md:block w-40" />
        </div>
      </div>
    </motion.nav>
  );
}

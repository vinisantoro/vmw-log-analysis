"use client";

import Link from "next/link";
import { Home, Upload, Timeline, Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const menuItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/timeline", label: "Timeline", icon: Timeline },
    { href: "/analyze", label: "Análise", icon: Search },
  ];

  return (
    <div
      className={cn(
        "md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={onClose} className="p-2" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

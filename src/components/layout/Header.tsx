"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Upload, Timeline, Search } from "lucide-react";
import { HamburgerMenu } from "./HamburgerMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">VMware Log Analysis</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              <Home className="w-4 h-4 inline mr-2" />
              Início
            </Link>
            <Link
              href="/upload"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload
            </Link>
            <Link
              href="/timeline"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              <Timeline className="w-4 h-4 inline mr-2" />
              Timeline
            </Link>
            <Link
              href="/analyze"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              <Search className="w-4 h-4 inline mr-2" />
              Análise
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

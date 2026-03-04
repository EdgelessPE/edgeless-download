import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { EXTERNAL_URLS } from "@/lib/api";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { key: "home", label: "首页", href: EXTERNAL_URLS.home, external: true },
    { key: "docs", label: "文档", href: EXTERNAL_URLS.wiki, external: true },
    { key: "download", label: "下载", href: "#", external: false },
  ];

  return (
    <header className={className}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center">
        <div className="flex items-center gap-2">
          <img src={EXTERNAL_URLS.favicon} alt="Edgeless Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">Edgeless</span>
        </div>
        <div className="hidden md:flex items-center h-full ml-auto">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.external ? item.href : "#"}
              className={`px-5 h-full flex items-center text-sm font-medium transition-colors duration-150 hover:bg-secondary/60 ${
                item.key === "download"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer ml-4 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="切换主题"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          aria-label="菜单"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.external ? item.href : "#"}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  item.key === "download"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="cursor-pointer mt-2 p-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors flex items-center gap-3"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="text-sm font-medium">切换主题</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

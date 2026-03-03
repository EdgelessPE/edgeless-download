import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { EXTERNAL_URLS } from "@/lib/api";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const navItems = [
    { key: "home", label: "首页", href: EXTERNAL_URLS.home, external: true },
    { key: "docs", label: "文档", href: EXTERNAL_URLS.wiki, external: true },
    { key: "download", label: "下载", href: "#", external: false },
  ];

  return (
    <header className={className}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
        <div className="flex items-center gap-2">
          <img src={EXTERNAL_URLS.favicon} alt="Edgeless Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">Edgeless</span>
        </div>
        <nav className="ml-auto flex items-center h-full">
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
            className="ml-4 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="切换主题"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
}

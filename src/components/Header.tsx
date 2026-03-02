import { EXTERNAL_URLS } from "@/lib/api";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const navItems = [
    { key: "home", label: "首页", href: EXTERNAL_URLS.home, external: true },
    { key: "docs", label: "文档", href: EXTERNAL_URLS.wiki, external: true },
    { key: "download", label: "下载", href: "#", external: false },
  ];

  return (
    <header className={className}>
      <div className="header-content">
        <div className="header-brand">
          <img src={EXTERNAL_URLS.favicon} alt="Edgeless Logo" className="logo" />
          <span className="title">Edgeless</span>
        </div>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.external ? item.href : "#"}
              className={`nav-item ${item.key === "download" ? "active" : ""}`}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

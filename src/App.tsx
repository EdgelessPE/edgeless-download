import { useEffect, useState } from "react";
import { DownloadCard } from "@/components/DownloadCard";
import { Header } from "@/components/Header";
import { mapNoticeStyle, Notice } from "@/components/Notice";
import { PostDownloadDrawer } from "@/components/PostDownloadDrawer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getStatusMessage, useUserAgent } from "@/hooks/useUserAgent";
import { getHubInfo } from "@/lib/api";
import type { HubInfo } from "@/types";

function App() {
  const [year] = useState(new Date().getFullYear());
  const [hubInfo, setHubInfo] = useState<HubInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { enableDownload, status } = useUserAgent();

  useEffect(() => {
    const fetchHubInfo = async () => {
      try {
        const info = await getHubInfo();
        setHubInfo(info);
      } catch {
        setError("似乎无法连接到服务器");
      }
    };

    fetchHubInfo();
  }, []);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const backup = params.get("backup");

  //   if (backup) {
  //     const backupUrls: Record<string, string> = {
  //       "1": EXTERNAL_URLS.backup1,
  //       "2": EXTERNAL_URLS.backup2,
  //     };

  //     if (backupUrls[backup]) {
  //       const confirmed = window.confirm(
  //         "Edgeless Hub使用国内千兆上行服务器作为镜像源，且支持插件更新、快速配置、获取内测等网页版没有的功能，而且免费开源无广告。",
  //       );
  //       if (confirmed) {
  //         window.location.href = backupUrls[backup];
  //       }
  //     }
  //   }
  // }, []);

  const handleDownload = () => {
    if (hubInfo?.address) {
      setDrawerOpen(true);
      window.location.href = hubInfo.address;
    }
  };

  const renderAlert = () => {
    if (status === "loading" || status === "ok") return null;

    const messages = getStatusMessage(status);
    if (!messages.title) return null;

    const style = mapNoticeStyle(messages.a_type);

    return (
      <div className={`border-b ${style.bg} ${style.border}`}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${style.text} truncate`}>{messages.title}</p>
            <p className={`text-xs ${style.text} opacity-80 truncate`}>{messages.content}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header className="border-b border-border" />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-4">
        {renderAlert()}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {enableDownload && status === "ok" ? <Notice channel="Down" /> : null}
        <DownloadCard
          hubInfo={hubInfo}
          enableDownload={enableDownload}
          onDownload={handleDownload}
        />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border">
        Copyright © {year} Edgeless Project
      </footer>
      <PostDownloadDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { DownloadCard } from "@/components/DownloadCard";
import { Header } from "@/components/Header";
import { Notice } from "@/components/Notice";
import { PostDownloadDrawer } from "@/components/PostDownloadDrawer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getStatusMessage, useUserAgent } from "@/hooks/useUserAgent";
import { EXTERNAL_URLS, getHubInfo } from "@/lib/api";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const backup = params.get("backup");

    if (backup) {
      const backupUrls: Record<string, string> = {
        "1": EXTERNAL_URLS.backup1,
        "2": EXTERNAL_URLS.backup2,
      };

      if (backupUrls[backup]) {
        const confirmed = window.confirm(
          "Edgeless Hub使用国内千兆上行服务器作为镜像源，且支持插件更新、快速配置、获取内测等网页版没有的功能，而且免费开源无广告。",
        );
        if (confirmed) {
          window.location.href = backupUrls[backup];
        }
      }
    }
  }, []);

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

    return (
      <Alert variant="destructive" className="mb-4 banner-alert">
        <AlertTitle>{messages.title}</AlertTitle>
        <AlertDescription>{messages.content}</AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="app-container">
      <Header className="app-header" />
      <main className="app-content">
        {renderAlert()}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {enableDownload ? (
          <Notice channel="Down" />
        ) : (
          <Alert variant="destructive" className="mb-4 banner-alert">
            <AlertTitle>
              Edgeless Hub只能在Windows10/11
              64位系统上运行，我们视能够日常使用此版本Windows系统的电脑为Edgeless的硬件准入门槛
            </AlertTitle>
          </Alert>
        )}
        <DownloadCard
          hubInfo={hubInfo}
          enableDownload={enableDownload}
          onDownload={handleDownload}
        />
      </main>
      <footer className="app-footer">Copyright © {year} Edgeless Project</footer>
      <PostDownloadDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}

export default App;

import { ChevronDown, ExternalLink, FileIcon, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { API_ENDPOINTS, EXTERNAL_URLS } from "@/lib/api";
import type { HubInfo } from "@/types";

interface DownloadCardProps {
  hubInfo: HubInfo | null;
  enableDownload: boolean;
  onDownload: () => void;
}

export function DownloadCard({ hubInfo, enableDownload, onDownload }: DownloadCardProps) {
  const version = hubInfo?.version || "";

  const handleStationAlert = (url: string) => {
    const confirmed = window.confirm(
      "Edgeless Hub使用国内千兆上行服务器作为镜像源，且支持插件更新、快速配置、获取内测等网页版没有的功能，而且免费开源无广告。",
    );
    if (confirmed) {
      window.location.href = url;
    }
  };

  const handleManual = () => {
    window.location.href = EXTERNAL_URLS.wikiManual;
  };

  const handleDownloadISO = () => {
    window.location.href = API_ENDPOINTS.isoAddr;
  };

  const handleWebVersion = () => {
    handleStationAlert(EXTERNAL_URLS.webVersion);
  };

  // const handleBackup1 = () => {
  //   handleStationAlert(EXTERNAL_URLS.backup1);
  // };

  // const handleBackup2 = () => {
  //   handleStationAlert(EXTERNAL_URLS.backup2);
  // };

  return (
    <TooltipProvider>
      <div className="py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold">Edgeless Hub</h1>
          {version && (
            <Badge
              color="blue"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() =>
                window.open(
                  EXTERNAL_URLS.wiki +
                    "/v2/global/log.html#edgeless-hub更新日志-当前已发布最新版本-hub-beta",
                )
              }
            >
              Beta {version}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mb-8">
          使用Edgeless聚合客户端制作启动盘和个性化您的Edgeless
        </p>
        <div className="flex justify-center mb-10">
          <img
            src="/demo.jpg"
            alt="Edgeless Hub Demo"
            className="max-w-full h-auto rounded-lg border border-border"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3 justify-center flex-wrap">
            {enableDownload ? (
              <Button size="lg" onClick={onDownload}>
                立即下载
              </Button>
            ) : (
              <Button size="lg" onClick={handleManual}>
                手动制作
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  访问网页版
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleWebVersion}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  访问网页版
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={handleBackup1}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  访问备用站
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBackup2}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  访问天翼盘
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleDownloadISO}>
                  <FileIcon className="w-4 h-4 mr-2" />
                  下载ISO镜像
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-muted-foreground cursor-help flex items-center gap-1 hover:text-foreground transition-colors">
                <HelpCircle className="w-4 h-4" />
                这个应用是否安全？
              </p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                Edgeless Hub的源代码已经公开在
                <a
                  href={EXTERNAL_URLS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary transition-colors"
                >
                  GitHub仓库
                </a>
                ，欢迎审阅
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

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

  const handleBackup1 = () => {
    handleStationAlert(EXTERNAL_URLS.backup1);
  };

  const handleBackup2 = () => {
    handleStationAlert(EXTERNAL_URLS.backup2);
  };

  return (
    <TooltipProvider>
      <div className="result-container">
        <div className="result-title">
          Edgeless Hub
          {version && (
            <Badge
              color="blue"
              className="version-badge cursor-pointer"
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
        <div className="result-subtitle">使用Edgeless聚合客户端制作启动盘和个性化您的Edgeless</div>
        <div className="result-icon">
          <img src="/demo.jpg" alt="Edgeless Hub Demo" className="display-img" />
        </div>
        <div className="result-extra">
          <div className="button-group">
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
                <DropdownMenuItem onClick={handleBackup1}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  访问备用站
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBackup2}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  访问天翼盘
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadISO}>
                  <FileIcon className="w-4 h-4 mr-2" />
                  下载ISO镜像
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="help-text">
                <HelpCircle className="w-4 h-4" />
                这个应用是否安全？
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Edgeless Hub的源代码已经公开在
                <a
                  href={EXTERNAL_URLS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
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

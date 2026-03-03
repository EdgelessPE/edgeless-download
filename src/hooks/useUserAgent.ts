import { useCallback, useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export type UAStatus = "loading" | "mobile" | "windows-old" | "32bit" | "unsupported" | "ok";

export interface UseUserAgentResult {
  status: UAStatus;
  enableDownload: boolean;
  isMobile: boolean;
  isWindows: boolean;
  isWindows10OrLater: boolean;
  is64Bit: boolean;
}

export function useUserAgent(): UseUserAgentResult {
  const [status, setStatus] = useState<UAStatus>("loading");
  const [enableDownload, setEnableDownload] = useState(false);

  const checkUserAgent = useCallback(() => {
    const ua = navigator.userAgent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parser = new (UAParser as any)();
    const os = parser.setUA(ua).getOS();

    const isMobile = os.name === "iOS" || os.name === "Android";
    const isWindows = os.name === "Windows";
    const isWindows10OrLater = isWindows && parseInt(os.version || "0", 10) >= 10;
    const is64Bit = ua.toLowerCase().includes("win64") || ua.toLowerCase().includes("wow64");

    if (isMobile) {
      setStatus("mobile");
      setEnableDownload(true);
      return;
    }

    if (!isWindows) {
      setStatus("unsupported");
      setEnableDownload(false);
      return;
    }

    if (!isWindows10OrLater) {
      setStatus("windows-old");
      setEnableDownload(false);
      return;
    }

    if (!is64Bit) {
      setStatus("32bit");
      setEnableDownload(false);
      return;
    }

    setStatus("ok");
    setEnableDownload(true);
  }, []);

  useEffect(() => {
    checkUserAgent();
  }, [checkUserAgent]);

  return {
    status,
    enableDownload,
    isMobile: status === "mobile",
    isWindows: status !== "unsupported" && status !== "mobile",
    isWindows10OrLater: status !== "windows-old" && status !== "unsupported" && status !== "mobile",
    is64Bit: status !== "32bit" && status !== "unsupported" && status !== "mobile",
  };
}

export function getStatusMessage(status: UAStatus): {
  title: string;
  content: string;
  a_type: "warning" | "error";
} {
  switch (status) {
    case "mobile":
      return {
        title: "请使用PC访问本站",
        content: "移动端无法获得最佳的浏览体验",
        a_type: "warning",
      };
    case "windows-old":
      return {
        title: "不支持过时的Windows系统",
        content:
          "Edgeless Hub只能在Windows10/11 64位系统上运行，请手动制作启动盘，或尝试绕过这一限制",
        a_type: "error",
      };
    case "32bit":
      return {
        title: "不支持过时的32位系统",
        content: "Edgeless Hub只能在Windows10/11 64位系统上运行，请手动制作启动盘，或升级您的系统",
        a_type: "error",
      };
    case "unsupported":
      return {
        title: "您正在使用类UNIX系统浏览此页面",
        content: "请手动制作启动盘",
        a_type: "error",
      };
    default:
      return { title: "", content: "", a_type: "warning" };
  }
}

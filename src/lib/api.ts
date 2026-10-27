import type { HubInfo, NoticeItem } from "@/types";

async function getJSON<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getHubInfo(): Promise<HubInfo> {
  return getJSON<HubInfo>(API_ENDPOINTS.hub);
}

export async function getNotice(): Promise<NoticeItem[]> {
  return getJSON<NoticeItem[]>(API_ENDPOINTS.notice);
}

export const API_ENDPOINTS = {
  hub: "https://legacy.edgeless.top/api/v2/info/hub",
  notice: "https://legacy.edgeless.top/api/v2/info/notice",
  isoAddr: "https://legacy.edgeless.top/api/v2/info/iso_addr",
} as const;

export const EXTERNAL_URLS = {
  home: "https://home.edgeless.top",
  wiki: "https://wiki.edgeless.top",
  webVersion: "https://zfile.edgeless.top",
  backup1: "https://home.edgeless.top/jump/lurenjia.html",
  backup2: "https://home.edgeless.top/jump/189.html",
  wikiRequired: "https://wiki.edgeless.top/v2/required.html",
  wikiManual: "https://wiki.edgeless.top/v2/guide/burn_manual.html",
  github: "https://github.com/EdgelessPE/edgeless-hub",
  favicon: "https://home.edgeless.top/favicon.ico",
} as const;

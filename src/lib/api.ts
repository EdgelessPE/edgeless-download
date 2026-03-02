import axios from "axios";
import type { HubInfo, NoticeItem } from "@/types";

const apiClient = axios.create({
  timeout: 5000,
});

export async function getHubInfo(): Promise<HubInfo> {
  const response = await apiClient.get<HubInfo>("https://legacy.edgeless.top/api/v2/info/hub");
  return response.data;
}

export async function getNotice(): Promise<NoticeItem[]> {
  const response = await apiClient.get<NoticeItem[]>(
    "https://legacy.edgeless.top/api/v2/info/notice",
  );
  return response.data;
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

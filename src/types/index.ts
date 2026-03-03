export interface HubInfo {
  miniupdate_pack_addr: string;
  update_pack_addr: string;
  full_update_redirect: string;
  update_info: {
    dependencies_requirement: string;
    wide_gaps: string[];
  };
  version: string;
  address: string;
}

export interface NoticeItem {
  id: string;
  channel: string;
  a_type: "info" | "warning" | "error" | "success";
  show_icon: boolean;
  message: string;
  description: string;
  close_text: string;
  lower_than: string;
}

export interface UserAgentInfo {
  os: {
    name: string;
    version: string;
  };
  device: {
    type: string;
  };
}

export type AlertType = "info" | "warning" | "error" | "success" | "destructive";

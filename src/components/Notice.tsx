import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getNotice } from "@/lib/api";
import type { NoticeItem } from "@/types";

interface NoticeProps {
  channel?: string;
}

const STORAGE_KEY = "edgeless_ignore_notice_id";

function mapAlertType(aType: string): "default" | "destructive" | "success" | "warning" {
  switch (aType) {
    case "warning":
      return "warning";
    case "error":
      return "destructive";
    case "success":
      return "success";
    default:
      return "default";
  }
}

export function Notice({ channel = "Down" }: NoticeProps) {
  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const notices = await getNotice();
        const filtered = notices.filter((n) => n.channel === channel);

        if (filtered.length === 0) return;

        const targetNotice = filtered[0];
        const ignoredId = localStorage.getItem(STORAGE_KEY);

        if (targetNotice.id !== ignoredId) {
          setNotice(targetNotice);
          setIsVisible(true);
        }
      } catch {
        // Silently fail
      }
    };

    fetchNotice();
  }, [channel]);

  const handleClose = () => {
    if (notice) {
      localStorage.setItem(STORAGE_KEY, notice.id);
    }
    setIsVisible(false);
  };

  if (!isVisible || !notice) return null;

  return (
    <Alert variant={mapAlertType(notice.a_type)} className="mb-4">
      {notice.show_icon && <AlertTitle>{notice.message}</AlertTitle>}
      <AlertDescription>{notice.description}</AlertDescription>
      {notice.close_text && (
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 text-sm opacity-70 hover:opacity-100"
        >
          {notice.close_text}
        </button>
      )}
    </Alert>
  );
}

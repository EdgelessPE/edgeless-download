import { useEffect, useState } from "react";
import { getNotice } from "@/lib/api";
import type { NoticeItem } from "@/types";

interface NoticeProps {
  channel?: string;
}

const STORAGE_KEY = "edgeless_ignore_notice_id";

export function mapNoticeStyle(aType: string): {
  bg: string;
  border: string;
  text: string;
  iconBg: string;
} {
  switch (aType) {
    case "warning":
      return {
        bg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-200 dark:border-amber-800",
        text: "text-amber-800 dark:text-amber-200",
        iconBg: "bg-amber-100 dark:bg-amber-900",
      };
    case "error":
      return {
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-200 dark:border-red-800",
        text: "text-red-800 dark:text-red-200",
        iconBg: "bg-red-100 dark:bg-red-900",
      };
    case "success":
      return {
        bg: "bg-green-50 dark:bg-green-950/30",
        border: "border-green-200 dark:border-green-800",
        text: "text-green-800 dark:text-green-200",
        iconBg: "bg-green-100 dark:bg-green-900",
      };
    default:
      return {
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-800",
        text: "text-blue-800 dark:text-blue-200",
        iconBg: "bg-blue-100 dark:bg-blue-900",
      };
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

  const style = mapNoticeStyle(notice.a_type);

  return (
    <div className={`border-b ${style.bg} ${style.border}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${style.text} truncate`}>{notice.message}</p>
          {notice.description && (
            <p className={`text-xs ${style.text} opacity-80 truncate`}>{notice.description}</p>
          )}
        </div>
        {notice.close_text && (
          <button
            type="button"
            onClick={handleClose}
            className={`shrink-0 px-3 py-1 rounded-md text-sm ${style.text} opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all`}
          >
            {notice.close_text}
          </button>
        )}
      </div>
    </div>
  );
}

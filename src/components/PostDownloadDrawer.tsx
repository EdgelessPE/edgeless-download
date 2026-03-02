import { Button } from "@/components/ui/button";
import { EXTERNAL_URLS } from "@/lib/api";

interface PostDownloadDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostDownloadDrawer({ open, onOpenChange }: PostDownloadDrawerProps) {
  const handleConfirm = () => {
    window.location.href = EXTERNAL_URLS.wikiRequired;
  };

  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={() => onOpenChange(false)}>
      <div
        className="drawer-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-title" id="drawer-title">
          感谢下载Edgeless Hub
        </div>
        <p className="drawer-description">
          我们强烈建议您阅读Wiki后再使用Edgeless，在这里有大部分问题的解决方案和所有的Edgeless特色功能
        </p>
        <div className="drawer-footer">
          <Button onClick={handleConfirm}>好</Button>
        </div>
      </div>
    </div>
  );
}

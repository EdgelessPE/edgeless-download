import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { EXTERNAL_URLS } from "@/lib/api";

interface PostDownloadDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostDownloadDrawer({ open, onOpenChange }: PostDownloadDrawerProps) {
  const handleConfirm = () => {
    window.location.href = EXTERNAL_URLS.wikiRequired;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[30vh] max-w-lg mx-auto">
        <DrawerHeader className="gap-4">
          <DrawerTitle className="text-xl">🤗 感谢下载 Edgeless Hub</DrawerTitle>
          <DrawerDescription className="text-base leading-relaxed">
            我们强烈建议您在开始使用前先阅读 Wiki，这里有大部分问题的解决方案
            和所有特色功能的详细介绍，能帮助您更好地体验 Edgeless 的强大功能。
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleConfirm}>前往 Wiki</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

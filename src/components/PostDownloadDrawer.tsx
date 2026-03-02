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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>感谢下载Edgeless Hub</DrawerTitle>
          <DrawerDescription>
            我们强烈建议您阅读Wiki后再使用Edgeless，在这里有大部分问题的解决方案和所有的Edgeless特色功能
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={handleConfirm}>好</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

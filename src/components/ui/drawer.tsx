import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DrawerProps extends React.ComponentProps<"div"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldScaleBackground?: boolean;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onOpenChange, shouldScaleBackground = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center pointer-events-none",
        shouldScaleBackground && "bg-black/80 pointer-events-auto",
      )}
      {...props}
    />
  ),
);
Drawer.displayName = "Drawer";

const DrawerTrigger = Button;

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button variant="outline" className={cn("mt-2 sm:mt-0", className)} ref={ref} {...props} />
));
DrawerClose.displayName = "DrawerClose";

const drawerVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
);

interface DrawerContentProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof drawerVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DrawerContent = React.forwardRef<React.ElementRef<"div">, DrawerContentProps>(
  ({ side = "bottom", className, children, open, onOpenChange, ...props }, ref) => (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <div
        ref={ref}
        className={cn(drawerVariants({ side }), className)}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </Drawer>
  ),
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<"h2">,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<"p">,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

const DrawerPortal = ({ ...props }: React.ComponentProps<typeof Drawer>) => <div {...props} />;
const DrawerOverlay = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = "DrawerOverlay";

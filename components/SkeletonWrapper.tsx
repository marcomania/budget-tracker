import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export function SekeletonWrapper({children, isLoading, fullWidth= true}: {children: ReactNode, isLoading: boolean, fullWidth?: boolean}) {
  if(!isLoading) return children;
  
  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-10">{children}</div>
    </Skeleton> 
  );
}

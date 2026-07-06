import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "../lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<any, any>(({ className, ...props }, ref) => (
<TabsPrimitive.List
ref={ref}
className={cn("inline-flex h-10 items-center rounded-md bg-muted p-1", className)}
{...props}
/>
))

const TabsTrigger = React.forwardRef<any, any>(({ className, ...props }, ref) => (
<TabsPrimitive.Trigger
ref={ref}
className={cn(
"px-3 py-1.5 text-sm rounded-sm data-[state=active]:bg-white",
className
)}
{...props}
/>
))

const TabsContent = React.forwardRef<any, any>(({ className, ...props }, ref) => (
<TabsPrimitive.Content
ref={ref}
className={cn("mt-2", className)}
{...props}
/>
))

export { Tabs, TabsList, TabsTrigger, TabsContent }

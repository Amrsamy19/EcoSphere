"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import React from "react";

import { useLocale } from "next-intl";

export default function SidebarTriggerBtn() {
  const { open, isMobile } = useSidebar();
  const locale = useLocale();
  const positionClass = locale === "ar" ? "right-4" : "left-4";

  return isMobile ? (
    <SidebarTrigger
      className={`absolute ${
        open ? "hidden" : "absolute"
      }  top-4 ${positionClass} size-5`}
    />
  ) : (
    <SidebarTrigger className="hidden" />
  );
}

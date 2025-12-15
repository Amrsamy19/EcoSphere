"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useLocale } from "next-intl";
import React from "react";

export default function SidebarTriggerBtn() {
  const { open, isMobile } = useSidebar();
  const locale = useLocale();
  return isMobile ? (
    <SidebarTrigger
      className={`absolute ${open ? "hidden" : "absolute"}  top-4 ${
        locale === "ar" ? "right-4" : "left-4"
      } size-5`}
    />
  ) : (
    <SidebarTrigger className="hidden" />
  );
}

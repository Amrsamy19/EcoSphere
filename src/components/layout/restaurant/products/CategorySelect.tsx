"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenuItemCategory } from "@/backend/features/restaurant/restaurant.model";
import { useTranslations } from "next-intl";

interface CategorySelectProps {
  value: MenuItemCategory | undefined;
  onChange: (value: MenuItemCategory) => void;
  error?: string;
}

export default function CategorySelect({
  value,
  onChange,
  error,
}: CategorySelectProps) {
  const t = useTranslations("Restaurant.Products");

  return (
    <div className="space-y-2">
      <Label htmlFor="category">{t("popup.categoryLabel")}</Label>
      <Select
        value={value}
        onValueChange={(val) => onChange(val as MenuItemCategory)}
      >
        <SelectTrigger id="category">
          <SelectValue placeholder={t("popup.categoryPlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Fruits">{t("Categories.fruits")}</SelectItem>
          <SelectItem value="Vegetables">
            {t("Categories.vegetables")}
          </SelectItem>
          <SelectItem value="Meat">{t("Categories.meat")}</SelectItem>
          <SelectItem value="Dairy">{t("Categories.dairy")}</SelectItem>
          <SelectItem value="Bakery">{t("Categories.bakery")}</SelectItem>
          <SelectItem value="Beverages">{t("Categories.beverages")}</SelectItem>
          <SelectItem value="Snacks">{t("Categories.snacks")}</SelectItem>
          <SelectItem value="Other">{t("Categories.other")}</SelectItem>
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

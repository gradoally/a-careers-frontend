import { createNavigation } from "next-intl/navigation";
import { locales, localePrefix } from "@/config/config";

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({
    locales,
    localePrefix,
  });

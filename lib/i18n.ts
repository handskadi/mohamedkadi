import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export function useI18n() {
  const locale = useLocale();
  const t = useTranslations("common");
  return { locale, t };
}

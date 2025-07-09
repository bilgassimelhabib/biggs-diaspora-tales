import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function LanguageToggle() {
  const { language, switchLanguage } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      {language.toUpperCase()}
    </Button>
  );
}
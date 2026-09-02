import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { PHONE_TEL, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Size = "md" | "lg" | "xl";

export function CallButtons({
  size = "lg",
  className,
  fullWidth = false,
  callLabel = "Ligar agora",
}: {
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  callLabel?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row",
        fullWidth && "w-full",
        className,
      )}
    >
      <Button
        asChild
        variant="primary"
        size={size}
        className={fullWidth ? "flex-1" : undefined}
      >
        <a href={`tel:${PHONE_TEL}`}>
          <Phone className="size-5 shrink-0" strokeWidth={2.4} />
          {callLabel}
        </a>
      </Button>
      <Button
        asChild
        variant="zap"
        size={size}
        className={fullWidth ? "flex-1" : undefined}
      >
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="size-5 shrink-0" />
          WhatsApp
        </a>
      </Button>
    </div>
  );
}

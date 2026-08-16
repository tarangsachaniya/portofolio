import { LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  /** shown in the address bar */
  domain: string;
  /** file under client/public/products or /projects — omit for the placeholder */
  src?: string;
  alt?: string;
  /** accent hue in degrees, used for the generated placeholder */
  hue?: number;
  label?: string;
  className?: string;
}

/**
 * Terminal-styled browser chrome around a screenshot slot.
 * When `src` is absent it renders a generated placeholder tile built from
 * `hue`, so a card with no screenshot yet still looks intentional — drop the
 * real image into the folder and it takes over with no code change.
 */
export default function BrowserFrame({
  domain,
  src,
  alt,
  hue = 142,
  label,
  className,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </span>
        <span className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded border border-border bg-background px-2 py-1">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: `hsl(${hue} 71% 45%)` }}
            aria-hidden
          />
          <span className="truncate font-mono text-[10px] text-muted-foreground">
            {domain}
          </span>
        </span>
      </div>

      {/* viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {src ? (
          <img
            src={src}
            alt={alt ?? ""}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          /*
           * A solid panel with one small, contained glow behind an icon —
           * not a full-bleed blurred wash. The wash version desaturated into
           * a washed-out pastel blob at low-saturation hues on light
           * backgrounds; this reads as an intentional "no preview yet" tile.
           */
          <div className="absolute inset-0 bg-elevated">
            <div className="absolute inset-0 bg-grid text-foreground/[0.06]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute h-44 w-44 rounded-full blur-2xl"
                style={{
                  background: `radial-gradient(circle, hsl(${hue} 75% 55% / 0.35) 0%, transparent 72%)`,
                }}
                aria-hidden
              />
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border bg-background/80 backdrop-blur-sm"
                style={{ borderColor: `hsl(${hue} 60% 50% / 0.35)` }}
              >
                <LayoutTemplate
                  className="h-5 w-5"
                  style={{ color: `hsl(${hue} 70% 55%)` }}
                  aria-hidden
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4">
              <span
                className="rounded-md border bg-background/80 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur-sm"
                style={{ borderColor: `hsl(${hue} 60% 50% / 0.3)` }}
              >
                {label ?? domain}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

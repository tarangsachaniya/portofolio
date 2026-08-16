import { cn } from "@/lib/utils";

/**
 * Tech logos are bundled locally (client/src/assets/icons) rather than fetched
 * from cdn.simpleicons.org at runtime — no third-party dependency, no DNS+TLS
 * round trip per icon, and they work offline.
 *
 * Not every tool has a SimpleIcons entry (AWS and OpenAI were removed for
 * trademark reasons), so anything without a slug renders a lettermark.
 */
const icons = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const bySlug: Record<string, string> = {};
for (const [path, url] of Object.entries(icons)) {
  const slug = path.split("/").pop()!.replace(".svg", "");
  bySlug[slug] = url;
}

export function hasIcon(slug?: string): boolean {
  return !!slug && slug in bySlug;
}

interface TechIconProps {
  name: string;
  slug?: string;
  className?: string;
  size?: number;
}

export default function TechIcon({
  name,
  slug,
  className,
  size = 20,
}: TechIconProps) {
  const src = slug ? bySlug[slug] : undefined;

  if (!src) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size }}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-[4px]",
          "border border-border bg-elevated font-mono font-bold text-muted-foreground",
          className,
        )}
      >
        <span style={{ fontSize: size * 0.5 }}>{name.charAt(0)}</span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size }}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

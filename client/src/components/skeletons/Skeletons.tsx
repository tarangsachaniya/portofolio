/**
 * Skeleton placeholders, one per section. Shapes mirror the real layout so the
 * swap from skeleton -> content causes no layout shift. The `.shimmer` class
 * (see index.css) paints a 1.5s left-to-right gradient sweep over each block.
 */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-md ${className}`} />;
}

const wrap = "mx-auto w-full max-w-[1200px] px-6";

export function HeroSkeleton() {
  return (
    <section className="flex min-h-screen items-center pt-24">
      <div className={wrap}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* avatar */}
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="shimmer h-64 w-64 rounded-full md:h-80 md:w-80" />
          </div>
          {/* text */}
          <div className="order-1 space-y-5 lg:order-2">
            <Bar className="h-7 w-44" />
            <Bar className="h-14 w-3/4" />
            <Bar className="h-10 w-1/2" />
            <div className="space-y-2 pt-2">
              <Bar className="h-3 w-full" />
              <Bar className="h-3 w-11/12" />
              <Bar className="h-3 w-2/3" />
            </div>
            <div className="flex gap-4 pt-3">
              <Bar className="h-12 w-40 rounded-full" />
              <Bar className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <section className="py-24">
      <div className={wrap}>
        <Bar className="mb-3 h-9 w-52" />
        <Bar className="mb-12 h-1 w-20" />
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <div className="shimmer mx-auto h-64 w-64 rounded-3xl" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Bar key={i} className={`h-3 ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
            ))}
            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Bar key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSkeleton() {
  return (
    <section className="py-24">
      <div className={wrap}>
        <Bar className="mx-auto mb-3 h-9 w-64" />
        <Bar className="mx-auto mb-12 h-3 w-80" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, c) => (
            <div key={c} className="space-y-4 rounded-2xl border border-border p-6">
              <Bar className="h-5 w-28" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Bar key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="shimmer h-44 w-full" />
      <div className="space-y-3 p-5">
        <Bar className="h-5 w-3/4" />
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-5/6" />
        <div className="flex gap-2 pt-1">
          <Bar className="h-6 w-16 rounded-full" />
          <Bar className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="py-24">
      <div className={wrap}>
        <Bar className="mb-3 h-9 w-56" />
        <Bar className="mb-12 h-1 w-20" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="py-24">
      <div className={wrap}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <Bar className="h-10 w-64" />
            <Bar className="h-3 w-full" />
            <Bar className="h-3 w-4/5" />
            <div className="flex gap-3 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Bar key={i} className="h-11 w-11 rounded-full" />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <Bar className="h-12 w-full rounded-xl" />
            <Bar className="h-12 w-full rounded-xl" />
            <Bar className="h-32 w-full rounded-xl" />
            <Bar className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      id="main-content"
      className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-mono text-sm text-[var(--color-cyan)]">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
        This page wandered off the grid.
      </h1>
      <p className="mt-4 max-w-md text-white/60">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          Chat Mode home
        </Link>
        <Link
          href="/standard"
          className="glass rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          Standard Mode home
        </Link>
      </div>
    </div>
  );
}

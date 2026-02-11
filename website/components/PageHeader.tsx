"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Abstract art background - simplified for mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#10a37f] to-transparent opacity-10 blur-3xl" />
        <div className="hidden sm:block absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-gradient-to-tr from-[#10a37f] to-transparent opacity-10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 md:py-24 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-tight sm:leading-snug">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed sm:leading-8 text-gray-600">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

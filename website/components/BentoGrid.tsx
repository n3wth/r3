"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  gradient?: string;
  span?: string;
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  children,
  gradient = "from-gray-900 to-gray-800",
  span = "col-span-1",
}: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 md:p-8",
        "bg-white/[0.03] transition-all duration-300",
        "hover:border-white/15 hover:bg-white/[0.05]",
        span,
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 inline-flex rounded-lg bg-white/[0.06] p-2.5">
            {icon}
          </div>
        )}

        <h3 className="mb-2 text-base font-medium text-white break-words md:text-lg">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[var(--color-grey-400)] break-words leading-relaxed">
            {description}
          </p>
        )}

        {children}
      </div>
    </motion.div>
  );
}

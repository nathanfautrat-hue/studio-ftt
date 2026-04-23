"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  image?: string;
  preview?: ReactNode;
  href: string;
  status: "client" | "demo";
  index?: number;
};

export default function ProjectCard({
  title,
  category,
  description,
  image,
  preview,
  href,
  status,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={href} className="block">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(232,53,42,0.35)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
            {preview ? (
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                {preview}
              </div>
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-5">
              {status === "client" ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-4 py-1.5 text-xs tracking-[0.25em] uppercase font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Site client
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 text-white/70 border border-white/20 px-4 py-1.5 text-xs tracking-[0.25em] uppercase font-semibold">
                  <span className="h-2 w-2 rounded-full bg-white/40" />
                  Concept démo
                </span>
              )}
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
              {category}
            </div>
            <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-3">
              {title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-md">
              {description}
            </p>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E8352A] font-medium">
              Voir le projet <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

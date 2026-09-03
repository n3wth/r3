import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXComponents } from "@/components/MDXComponents";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug
    ? resolvedParams.slug.join("/")
    : "introduction";
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    return {
      title: "Page Not Found | r3 Documentation",
    };
  }

  const title = doc.meta.title
    ? `${doc.meta.title} | r3 Documentation`
    : "r3 Documentation";
  const description =
    doc.meta.description ||
    "r3 is an open-source local Redis memory MCP server for AI assistants. Install with npx @n3wth/r3.";
  const url = `https://r3.n3wth.com/docs/${slugPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "r3",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@n3wth",
    },
  };
}

const components = {
  ...MDXComponents,
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-normal text-ink mb-6">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-normal text-ink mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-lg font-medium text-ink mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-ink-dim mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="text-ink-dim mb-4 space-y-2 list-disc list-inside">
      {children}
    </ul>
  ),
  li: ({ children }: any) => <li className="text-ink-dim">{children}</li>,
  a: ({ href, children }: any) => {
    // Handle external links
    if (href?.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-dim hover:text-accent transition-colors"
        >
          {children}
        </a>
      );
    }
    // Handle internal links
    return (
      <Link
        href={href || "#"}
        className="text-accent-dim hover:text-accent transition-colors"
      >
        {children}
      </Link>
    );
  },
  strong: ({ children }: any) => (
    <strong className="text-ink font-medium">{children}</strong>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-rail">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-bg-soft">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-rail">{children}</tbody>
  ),
  tr: ({ children }: any) => <tr>{children}</tr>,
  th: ({ children }: any) => (
    <th className="px-4 py-3 text-left text-sm font-medium text-ink">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-3 text-sm text-ink-dim">{children}</td>
  ),
};

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug
    ? resolvedParams.slug.join("/")
    : "introduction";
  const doc = await getDocBySlug(slugPath);
  const allDocs = await getAllDocs();

  if (!doc) {
    notFound();
  }

  const currentIndex = allDocs.findIndex((d) => d.slug === slugPath);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  const pageUrl = `https://r3.n3wth.com/docs/${slugPath}`;
  const pageTitle = doc.meta.title || "Documentation";
  const pageDescription =
    doc.meta.description ||
    "r3 is an open-source local Redis memory MCP server for AI assistants.";

  return (
    <>
      <JsonLd
        type="WebPage"
        data={{
          name: pageTitle,
          description: pageDescription,
          url: pageUrl,
        }}
      />
      <article className="prose prose-invert max-w-none">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-16 pt-8 border-t border-rail">
        {prevDoc ? (
          <Link
            href={`/docs/${prevDoc.slug}`}
            className="flex items-center gap-2 text-ink-dim hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {prevDoc.title}
          </Link>
        ) : (
          <div />
        )}

        {nextDoc && (
          <Link
            href={`/docs/${nextDoc.slug}`}
            className="flex items-center gap-2 text-ink-dim hover:text-ink transition-colors"
          >
            {nextDoc.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </>
  );
}

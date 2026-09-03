import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/DocsSidebar";
import { TableOfContents } from "@/components/TableOfContents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navigation />

      <div className="mx-auto max-w-[1600px] w-full px-6 pt-20 pb-8 lg:px-8 flex-1">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <div className="sticky top-20">
              <DocsSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main id="main-content" className="min-w-0 max-w-4xl flex-grow">{children}</main>

          {/* Table of Contents */}
          <aside className="hidden xl:block w-[240px] flex-shrink-0">
            <div className="sticky top-20">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

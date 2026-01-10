interface RelatedLink {
  href: string;
  title: string;
  source: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
}

/**
 * Related links section for cross-referencing external content
 */
export function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <aside class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
        Related Reading
      </h3>
      <ul class="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              class="group block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="text-blueprint-500 dark:text-blueprint-400 group-hover:underline">
                {link.title}
              </span>
              <span class="text-slate-400 dark:text-slate-500 text-sm ml-2">
                — {link.source}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

import { ComponentChildren } from "preact";

interface TaxonomyGridProps {
  children: ComponentChildren;
}

/**
 * Responsive grid container for TaxonomyCards
 * Single column on mobile, can expand on larger screens
 */
export function TaxonomyGrid({ children }: TaxonomyGridProps) {
  return <div class="space-y-4">{children}</div>;
}

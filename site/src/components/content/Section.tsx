import { ComponentChildren } from "preact";

interface SectionProps {
  id?: string;
  children: ComponentChildren;
}

/**
 * Section wrapper for content sections
 * Provides consistent spacing and optional id for scroll-spy/linking
 */
export function Section({ id, children }: SectionProps) {
  return (
    <section id={id} class="mb-12">
      {children}
    </section>
  );
}

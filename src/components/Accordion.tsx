"use client";

import { useState } from "react";
import styles from "./accordion.module.css";

export interface AccordionItem {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className={styles.list}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.q}
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{it.q}</span>
              <span className={styles.icon} aria-hidden="true" />
            </button>
            <div id={`faq-${i}`} className={styles.a} role="region">
              <div>
                <p>{it.a}</p>
                {it.link && (
                  <a href={it.link.href} target="_blank" rel="noopener noreferrer">
                    {it.link.label} ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

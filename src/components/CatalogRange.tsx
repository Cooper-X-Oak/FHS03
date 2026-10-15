"use client";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/client-events";
import { focusRequest } from "./RequestLink";
export function CatalogRange({
  items,
}: {
  items: { id: string; label: string; path: string; summary: string }[];
}) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    queueMicrotask(() =>
      setQuery(new URLSearchParams(location.search).get("q") || ""),
    );
  }, []);
  const results = items.filter((i) =>
    `${i.label} ${i.summary}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="section" data-module="M05">
      <div className="container">
        <label htmlFor="range-search">Search the product range</label>
        <input
          id="range-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            const url = new URL(location.href);
            if (e.target.value) url.searchParams.set("q", e.target.value);
            else url.searchParams.delete("q");
            history.replaceState(null, "", url);
            if (e.target.value) {
              let robots =
                document.querySelector<HTMLMetaElement>("meta[name=robots]");
              if (!robots) {
                robots = document.createElement("meta");
                robots.name = "robots";
                document.head.append(robots);
              }
              robots.content = "noindex, follow";
            }
          }}
        />
        {results.length ? (
          <table>
            <thead>
              <tr>
                <th>Product range</th>
                <th>Scope</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p) => (
                <tr key={p.id}>
                  <th>
                    <a href={p.path}>{p.label}</a>
                  </th>
                  <td>{p.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            <a
              href="#contact"
              data-entry="longtail"
              onClick={(e) => {
                e.preventDefault();
                trackEvent("longtail_click", { entry_location: "longtail" });
                focusRequest("longtail", query);
              }}
            >
              Send your search to Nina
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

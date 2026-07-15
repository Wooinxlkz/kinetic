"use client";

import { CitationBadge, CitationList, type CitationSource } from "@/components/ai/source-citations";

const SOURCES: CitationSource[] = [
  {
    title: "Climate Change and Food Security: A Framework Document",
    url: "https://www.fao.org/publications/climate-food-security-framework",
    snippet:
      "Global warming of 1.5°C is projected to reduce crop yields by 2–6% per decade, with tropical regions experiencing the greatest impact on staple crops such as wheat, rice, and maize.",
  },
  {
    title: "IPCC Sixth Assessment Report — Agriculture Chapter",
    url: "https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5",
    snippet:
      "Adaptation measures including crop switching, irrigation expansion, and heat-resistant cultivar development can offset up to 40% of projected losses under moderate warming scenarios.",
  },
  {
    title: "Global temperature anomalies: NOAA data portal",
    url: "https://www.ncdc.noaa.gov/cag/global/time-series",
  },
  {
    title: "Yield stability under climate stress — Nature Food",
    url: "https://www.nature.com/articles/s43016-021-00400-y",
    snippet:
      "Analysis of 30-year yield data across 50 countries shows increasing inter-annual variability correlated with temperature extremes and drought frequency.",
  },
];

export function SourceCitationsPreview() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {/* Inline usage example */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
          Inline citations
        </p>
        <p className="text-sm leading-relaxed text-foreground">
          Climate change is projected to reduce global crop yields by 2–6% per
          decade
          <CitationBadge index={1} source={SOURCES[0]} />
          , with the IPCC noting that adaptation strategies could offset up to
          40% of these losses
          <CitationBadge index={2} source={SOURCES[1]} />
          . Temperature anomaly records
          <CitationBadge index={3} source={SOURCES[2]} />
          confirm rising inter-annual variability
          <CitationBadge index={4} source={SOURCES[3]} />
          in agricultural regions worldwide.
        </p>
      </div>

      {/* Citation list */}
      <CitationList sources={SOURCES} />
    </div>
  );
}

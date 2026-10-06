# Search Lab — the cycleforchange.org search case study

A running case study of how this site earns search visibility, written up week by
week. Thesis: SEO is the base layer; AI answers, social and word of mouth stand on
it. Started Oct 2, 2026 (Day 0).

- **The paper** (thesis, method, baseline, findings, challenges):
  https://claude.ai/code/artifact/926cf57f-e061-4d9c-a179-399498ffa4f6
- **The tracker** (weekly numbers, tracked searches, changes on trial, AI checks):
  https://claude.ai/artifact/BD35sHNzudnDZxiv6WnCLM

Both are private to Robert until shared.

## What lives here

| File | What it is |
| --- | --- |
| `crawl.mjs` | Crawls every URL in the live sitemap the way a search engine would. No dependencies. |
| `snapshots/<date>.summary.json` | One weekly summary per run (committed). Full per-page output stays local. |
| `keywords.json` | The searches and AI questions the study tracks. |

```
node seo/crawl.mjs                      # crawl the live site, write seo/snapshots/<today>.*
node seo/crawl.mjs --limit 50           # quick check
node seo/crawl.mjs --base http://localhost:8888   # crawl a local `netlify dev`
```

## The five layers (measured bottom up)

1. **Crawl and index** — pages found, answering, indexed. Crawler + Search Console.
2. **Rank** — position for tracked searches. Search Console.
3. **Clicks** — clicks and click-through. Search Console.
4. **Trust** — rides checked in the last 30 days, signups, return visits, links.
5. **Reach beyond search** — Google AI-feature impressions; monthly checks in ChatGPT, Perplexity, Google AI and Claude.

A gain in a higher layer only counts when the layers under it held that week.

## How a change gets logged

Every pull request that changes public pages is a change on trial. In the PR
description, add one line:

```
Search Lab: <what should move> · <which measure> · read <date>
```

Use a read date 2 weeks out for indexing changes and 4 weeks out for rankings.
The Monday run picks these up from merged PRs. Nothing is judged before its read date.

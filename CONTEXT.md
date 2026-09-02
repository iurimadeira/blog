# Technical blog

The public publishing context for Iuri Madeira's English-language technical writing and professional profile.

## Language

**Post**: A dated technical article published under `/posts/` and included in RSS.

**Page**: Undated supporting content such as About, Contact, Privacy, or Thank You.

**Preview**: A private deployed build used for review before a production change.

**Production deployment**: A manually triggered GitHub Pages build published at `https://iurimadeira.com/` using the canonical `baseURL` in `hugo.toml`.

## Relationships

- A **Post** belongs to the Posts section and may appear in RSS.
- A **Page** belongs to the site but does not appear in RSS.
- A **Preview** must pass browser QA before integration.
- A **Production deployment** requires separate explicit approval after integration.
- The initial domain cutover completed on September 2, 2026; the legacy repositories and their content remain preserved.

# Iuri Madeira's blog

Personal technical blog for [iurimadeira.com](https://iurimadeira.com), built with Hugo Extended and the pinned Hugo Blog Awesome theme.

## Local development

Install Hugo Extended 0.165.0, Node.js 24.15.0, and Go 1.26.5, then run:

```sh
hugo server
```

Run the behavior checks with:

```sh
npm test
```

Set `HUGO_WEB3FORMS_ACCESS_KEY` when building to enable contact-form delivery. Without it, the form renders a safe disabled preview with the public email fallback.

Deployment to GitHub Pages is intentionally manual through the `Deploy Hugo site to Pages` workflow. Merging a pull request does not deploy or change DNS.

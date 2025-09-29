# Content Directory

This directory contains the MDX content for the Rura na Kocierz website.

## Structure

```
content/
└── posts/
    ├── post-slug.mdx
    └── ...
```

## MDX Files

Each MDX file represents a blog post or article and should include frontmatter with the following fields:

```yaml
---
title: "Article Title"
date: "2025-01-01T00:00:00.000Z"
author: "author-name"
photo: "image-filename.jpg"
alias: "url-slug"
excerpt: "Short description for previews"
---
```

### Frontmatter Fields

- `title`: The article title
- `date`: Publication date in ISO format
- `author`: Author name
- `photo`: Image filename (stored in `/public/assets/posts/`)
- `alias`: URL slug for the article
- `excerpt`: Short description used in article previews

## Writing Content

You can use standard Markdown syntax plus:

- **Bold text** with `**bold**`
- *Italic text* with `*italic*`
- [Links](https://example.com) with `[text](url)`
- Images with `![alt](src)`
- Lists with `-` or `1.`
- Code blocks with triple backticks
- YouTube embeds with `<iframe>` tags

## Adding New Posts

1. Create a new `.mdx` file in the `posts/` directory
2. Use the article alias as the filename (e.g., `my-article.mdx`)
3. Add the required frontmatter
4. Write your content using Markdown/MDX syntax
5. Add any images to `/public/assets/posts/`

The site will automatically pick up new posts and include them in the articles listing.

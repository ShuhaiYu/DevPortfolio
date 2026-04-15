// GROQ queries for Sanity CMS

// Get all blog posts
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    "category": category->{ title, slug, color },
    tags
  }
`;

// Get a single post by slug
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    body,
    "category": category->{ title, slug, color },
    tags
  }
`;

// Get all post slugs for static generation
export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)].slug.current
`;

// Get latest N posts for homepage preview
export const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    "category": category->{ title, slug, color }
  }
`;

// Get all categories
export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    color
  }
`;

// Projects — summary cards for home page
export const projectsSummaryQuery = `
  *[_type == "project"] | order(order asc, publishedAt desc) {
    _id,
    title,
    tagline,
    slug,
    heroImage,
    technologies,
    liveUrl,
    repoUrl,
    order
  }
`;

// Single project by slug — full case study payload
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    tagline,
    slug,
    role,
    period,
    featured,
    order,
    heroImage,
    liveUrl,
    repoUrl,
    technologies,
    problem,
    approach,
    metrics,
    body,
    gallery,
    publishedAt
  }
`;

// All project slugs — for generateStaticParams
export const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)].slug.current
`;

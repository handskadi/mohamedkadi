import { MetadataRoute } from "next";
import blogPosts from "@/data/blogPosts";
import portfolio from "@/data/portfolios";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mohamedkadi.com";

  const staticRoutes = [
    "",
    "/portfolio",
    "/blog",
    "/tools",
    "/tools/image-compressor",
    "/contact",
    "/ⵎⴰⴷ-ⴳⵉⵖ",
  ];

  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const portfolioRoutes = portfolio.map((item) => `/portfolio/${item.slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes, ...portfolioRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));
}

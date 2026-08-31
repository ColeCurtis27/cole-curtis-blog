const pluginNavigation = require("@11ty/eleventy-navigation");

const pathPrefix = process.env.ELEVENTY_ENV === "production"
  ? "/cole-curtis-blog/"
  : "/";

module.exports = function(eleventyConfig) {

  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  // Navigation
  eleventyConfig.addPlugin(pluginNavigation);

  // Create a collection of blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("posts/*.md")
      .reverse();
  });

  // Display dates like "August 30, 2026"
  eleventyConfig.addFilter("readableDate", function(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const localDate = new Date(year, month, day);

    return localDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Keep dates in YYYY-MM-DD format for HTML
  eleventyConfig.addFilter("htmlDateString", function(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  return {
    pathPrefix: pathPrefix
  };
};
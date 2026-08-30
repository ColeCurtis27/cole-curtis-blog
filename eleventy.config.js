const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Navigation
  eleventyConfig.addPlugin(pluginNavigation);

  // Copy CSS files to the output folder
  eleventyConfig.addPassthroughCopy("css");

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
};
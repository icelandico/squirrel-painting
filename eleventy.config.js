import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles.css");

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    sharpOptions: {
      animated: true,
    },
  });

  eleventyConfig.setServerOptions({
    watch: ["_site/**/*.css", "_site/**/*.js"],
  });

  eleventyConfig.addNunjucksAsyncShortcode("svgIcon", async (filename) => {
    const metadata = await Image(`./src/assets/${filename}`, {
      formats: ["svg"],
      dryRun: true,
    });
    return metadata.svg[0].buffer.toString();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    pathPrefix: "/",
  };
}

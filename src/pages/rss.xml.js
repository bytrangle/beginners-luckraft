import rss from "@astrojs/rss"

export const get = () => rss({
  title: "Knitting Tutorial | Beginner's LUCKraft",
  description: "Knitting tutorial with free patterns.  Small item such as knitting a hat, mittens, socks. Bigger garments are like sweaters, summer top. The most popular tutorials are dog sweater knitting tutorial. Beginner's LUCKraft.",
  site: 'https://my-blog-site.netlify.app',
  items: import.meta.glob('./**/*.md'),
  customData: `<language>en-us</language>`
})
// @ts-check
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { escape } = require("html-escaper");

/**
 * Generate <a /> link html
 * @param {string} url
 * @param {string} text
 * @returns string
 */
function aLink(url, text) {
  return `<a href="${escape(
    url
  )} "target="_blank" rel="noopener noreferrer">${escape(text)}</a>`;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "g2d",
  tagline: "Transform .gitignore to .dockerignore .",
  url: "https://vdustr.dev",
  baseUrl: "/g2d.js/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: true,
  favicon: "img/logo.svg",
  organizationName: "vdustr", // Usually your GitHub org/user name.
  projectName: "g2d.js", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/g2d-og.png",
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "g2d",
        logo: {
          alt: "g2d Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "/online",
            label: "Try it Online!",
            position: "right",
          },
          {
            href: "https://github.com/VdustR/g2d.js",
            label: "Source Code",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Links",
            items: [
              {
                label: "Source Code",
                href: "https://github.com/VdustR/g2d.js",
              },
              {
                label: "Download Binaries",
                href: "https://github.com/VdustR/g2d/releases",
              },
              {
                label: "Container",
                href: "https://github.com/VdustR/g2d/pkgs/container/g2d",
              },
            ],
          },
          {
            title: "Libraries",
            items: [
              {
                label: "@g2d/core",
                to: "/node/lib",
              },
              {
                label: "@g2d/cli",
                to: "/node/cli",
              },
              {
                label: "Deno",
                href: "/deno",
              },
            ],
          },
          {
            title: "Tools",
            items: [
              {
                label: "g2d Online",
                to: "/online",
              },
            ],
          },
        ],
        logo: {
          alt: "g2d Logo",
          src: "img/g2d.svg",
          width: 160,
        },
        copyright: `Copyright © 2022-${new Date().getFullYear()} made by ${aLink(
          "//vdustr.dev",
          "ViPro"
        )} with 💙 under ${aLink(
          "//github.com/VdustR/g2d.js/blob/main/LICENSE",
          "MIT License"
        )}.`,
      },
      prism: {
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

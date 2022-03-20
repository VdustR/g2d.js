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
  favicon: "img/favicon.ico",
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
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
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
                label: "Downloads",
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
                href: "https://deno.land/x/g2d",
              },
            ],
          },
        ],
        copyright: `Copyright © 2022-${new Date().getFullYear()} made by ${aLink(
          "//vdustr.dev",
          "ViPro"
        )} with 💙 under license ${aLink(
          "//github.com/VdustR/g2d.js/blob/main/LICENSE",
          "MIT"
        )}.`,
      },
      prism: {
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

import React from "react";

import { RenderBodyArgs } from "gatsby";

import { themeAtomKey } from "@/hooks";

const onRenderBody = ({
  setHtmlAttributes,
  setPreBodyComponents,
  setHeadComponents
}: RenderBodyArgs) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme",
      dangerouslySetInnerHTML: {
        __html: `
          void function() {
            var cachedMode;

            try {
              var preferredTheme = JSON.parse(localStorage.getItem('${themeAtomKey}'));

              if (preferredTheme && preferredTheme.mode) {
                cachedMode = preferredTheme.mode;
              }
            } catch (err) { }

            function setTheme(newTheme) {
              document.documentElement.className = newTheme;
            }

            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

            setTheme(cachedMode || (darkQuery.matches ? 'dark' : 'light'));
          }()
        `,
      },
    }),
  ]);

  setHeadComponents([
    React.createElement("script", {
      key: "alphatab-script",
      src: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@alpha/dist/alphaTab.min.js",
      async: true,
    }),
  ]);

  setHtmlAttributes({ lang: "en" });
};

export { onRenderBody };

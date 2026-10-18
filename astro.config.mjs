// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";
import starlightAutoSidebar from "starlight-auto-sidebar";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Eclipse Animator",
			components: {
				Header: "./src/components/Header.astro",
			},
			customCss: ["./src/styles/global.css"],
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/eclipseanimator/docs",
				},
			],
			sidebar: [
        {
					label: "Guides",
					items: [
					  { autogenerate: { directory: "guides" } }
					],
        },
        {
          label: "Tutorials",
          items: [
            { autogenerate: { directory: "tutorials" } }
          ],
        },
        {
					label: "Migrating",
					items: [
					  { autogenerate: { directory: "migrating" } }
					],
        },
        {
          label: "API Reference",
          items: [
            { autogenerate: { directory: "reference" } }
          ]
				}
      ],
			plugins: [starlightAutoSidebar()]
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});

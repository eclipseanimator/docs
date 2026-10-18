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
					label: "Features",
					items: [
					  { autogenerate: { directory: "features" } }
					],
        },
        {
					label: "Guides",
					items: [
					  { autogenerate: { directory: "guides" } }
					],
        },
        {
					label: "Addons",
					items: [
					  { autogenerate: { directory: "addons" } }
					],
				},
      ],
			plugins: [starlightAutoSidebar()]
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});

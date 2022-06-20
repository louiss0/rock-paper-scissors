---
aliases: [vite template notes]
tags: [HTML, CSS, typescript]
note type: Main
---

# Vite Template

This template is a basic html css js template for that uses vite as it's module bundler. It's uses docker to start up the app. There are two folders at the main part of the project. The app folder and the dockerfiles folder. The app folder contains all of the source files for the project. Since docker is a dev environment there are no build docker files at all. In the app folder there is a folder named the src folder It has the files that are necessary. In the docker files folder there is a server docker file and an npm docker file. The main packages so far are `'vite- plugin-pug'` which allows you to inject pug into the html and `'windicss'` along with it's plugin.

To start up the server use the following command.

```bash
docker-compose up -d server
```

To download packages use this one

```bash
docker-compose run --rm npm install
```

The npm service is a _utility container_ that is used to access the node package manager called npm.

- The config file for vite looks like this

```javascript
export default defineConfig({
	server: {
		host: "0.0.0.0",

		port: 3000,

		watch: {
			usePolling: true,
		},
		plugins: [pugPlugin(), WindiCSS()],
	},
});
```

- Windi css config

```js
import { defineConfig } from "windicss/helpers";

export default defineConfig({
	attributify: {
		prefix: "w",
	},
});
```

## Folders and Files

| Folder  | Files                                                         |
| ------- | ------------------------------------------------------------- |
| app     | package.json, package-lock.json, tsconfig.json vite.config.ts |
| layouts | main.pug, home.pug                                            |
| mixins  | navbar.pug, container.pug                                     |
| src     | main.ts, style.css                                            |
| pages   | about.html                                                    |

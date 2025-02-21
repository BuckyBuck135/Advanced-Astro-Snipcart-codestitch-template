> [!WARNING]
> This beta version has not been tested in a real production environment.

 
  <h3 align="center">Advanced Astro Snipcart E-commerce Starter Kit</h3>

  <p align="center">
    This advanced starter kit includes a pre-configured Astro setup and a Snipcart integration built on top of the Snipcart platform. It is a solution for rapidly building and selling products on the web. 
    <br/>
    <br/>
    <a href="https://codestitch-astro-snipcart-starter-kit.netlify.app/" target="_blank">View Demo</a>
  </p>

  <p align="center">
    Created and maintained by <a href="https://github.com/BuckyBuck135" target="_blank">BuckyBuck135</a>
  </p>

![Screenshot of a the kit's homepage](/public/delete-me/kit-homepage.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Snipcart components](#snipcart-components)
- [Project Structure](#project-structure)
  - [Project Tree](#project-tree)
  - [Source Files and Folders](#source-files-and-folders)
- [Deployment](#deployment)
- [Acknowledgments](#acknowledgments)
- [Conclusion](#conclusion)

## Features

This Astro integration contains all of the features that you need to build an e-commerce site with [Snipcart](https://snipcart.com/), including:

- Automatic installation of the Snipcart library
- Astro components to define products
- Astro components for features such as displaying basket and total price
- Content collection populated with a generic product collection
- Dynamic product detail page setup
- Runs on Astro v5
- Automatic sitemaps

## Prerequisites

Make sure you understand [Snipcart's features and pricing structure](https://snipcart.com/), as well as what it can and cannot do, as opposed to Shopify for exxample.

To use the kit, familiarity with Astro is highly recommended, especially components, props and content collections. JavaScript knowledge is optional, but will be necessary for customizing Snipcart behavior further. While a lot of the legwork with the Snipcart integration has been done for you, we recommend the following resources:

1. [Astro's Documentation](https://docs.astro.build/en/getting-started/)
2. [Astro-Snipcart integration documentation](https://astro-snipcart.vercel.app/)
3. [Snipcart's documentation](https://docs.snipcart.com/v3/)

## Getting Started

### Installation

1. At the top right of the repository, click the green _Use this template_ button,
   then click _Create a new repository_.
2. Follow the instructions to create a new repository, using this repo as a template.
3. When created, clone the repository to your local machine.
4. Run `npm install` to install all dependencies.
5. Run `npm run dev` to start the project and spin up a development server on `localhost:4321`.

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

### Snipcart API key environment variable

Firstly make sure to have read how to define and read environment variables in the [Astro documentation](https://docs.astro.build/en/guides/environment-variables/).

This integration requires an environment variable named PUBLIC_SNIPCART_API_KEY. Remember, do not hardcode magic strings and do not commit secrets to a repository.

To do so, create a `.env` file at the root of the project to store your environment variables `PUBLIC_SNIPCART_API_KEY=write_your_key_here`

Get your Public Test API key on your Snipcart dashboard, under **_ /account/credentials _**

### Snipcart allowed domains

Snipcart by default does not allow any site to use your API key. [You need to configure it to allow your domain](https://docs.snipcart.com/v3/dashboard/store-configuration#5-domains--urls), under **_ /account/domains _**

### Defining products

> [!IMPORTANT]
> Products are not configured from within Snipcart. This puts you and your application in full control of product definitions.

This kit has elected to use ** Content collections** and markdown files to define the prodcuts, your products can be setup flexibly, such as:

- Simple Markdown files with the frontmatter containing the YAML frontmatter defining the title, price, variants, etc.
- JSON files
- Your own backend API

## Snipcart components

### CartCheckout

Used to trigger the opening of the Snipcart dialog.

- Slotted content will automatically trigger opening.

```astro
---
import { CartCheckout } from '@lloydjatkinson/astro-snipcart/astro';
---

<CartCheckout>
    <button>Open basket</button>
</CartCheckout>
```

### CustomerSignIn

Used to allow a customer to login or signup.

- The account is managed by Snipcart.
- Must be enabled in the Snipcart dashboard. Default is to allow guests only.
- Does nothing if allow guests only is enabled.

```astro
---
import { CartCheckout } from '@lloydjatkinson/astro-snipcart/astro';
---

<CustomerSignIn>
    <button>Login</button>
</CustomerSignIn>
```

### CartItemsCount

Used to render the count of total items in the cart.

- Snipcart will render the value.

```astro
---
import { CartItemsCount } from '@lloydjatkinson/astro-snipcart/astro';
---

<span>
    You have <CartItemsCount /> items in your cart.
</span>
```

### CartTotalPrice

Used to render the total price of the items in the cart.

- Snipcart will render the value.

```astro
---
import { CartTotalPrice } from '@lloydjatkinson/astro-snipcart/astro';
---

<span>
    You have £<CartItemsCount />  worth of items in your cart.
</span>
```

### Product

Used to define a product that is added to the cart when the user interacts with the component.

- This is a renderless component. That is, it does not visually render anything other than the slotted content and the appropriate Snipcart `data` attributes.
- Clicking this component triggers the adding of a product to the cart.
- Snipcart looks for the existence of this component with the appropriate `data` attributes and values as part of it's order validation (Snipcart can also use a JSON returning API for this).

```astro
<Product
   as="span"
   id="SKU-0001"
   name="Standard T-Shirt"
   url="/product/standard-t-shirt"
   price={12.99}
   description="Every day basic t-shirt"
   image="/blue-t-shirt.jpg"
   customFields={[
       { name: 'Size', options: ['Small', 'Medium', 'Large'], placeholder: 'Choose size', required: true },
       { name: 'Pattern', options: ['Abstract', 'Neon', 'Tiger[+5.00]'] }
   ]}>
   <button>
       Add
   </button>
</Product>
```

> [!TIP]
> For more info on Astro snipcart components ad customization, you can read
>
> - [Astro snipcart integration docs](https://astro-snipcart.vercel.app/guides/components-and-typescript/)
> - [Snipcart docs](https://docs.snipcart.com/v3/setup/customization)

## Project Structure

### Project Tree

```
.
├── public/
|   |—— assets/
|   |   |—— favicons/
|   |   |—— fonts/
|   |   |—— images/
|   |   └── svgs/
|   |—— _redirects
|   |—— robots.txt
├── src/
|   ├── assets/
|   |   └── images/
|   ├── components/
|   |   └── Snipcart/
|   ├── content/
|   |   └── blue-cap.md
│   ├── data/
│   │   ├── client.json
│   │   └── navData.json
|   ├── js/
|   |   └── nav.js
|   ├── icons/
│   ├── layouts/
│   │   ├── ProductLayout.astro
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── products/
│   │   |   ├── [...product].astro
│   │   |   └── index.astro
│   │   ├── index.astro
│   │   └── reviews.astro
│   ├── content.config.ts
|   └── styles/
├── .astro.config.mjs
└── .postcss.config.cjs
```

### Source Files and Folders

#### `public/*`

The `public/` directory is for files and assets in your project that do not need to be processed during Astro’s build process. The files in this folder will be copied into the build folder untouched, and then your site will be built.

This behavior makes `public/` ideal for common assets like images and fonts, or special files such as`_redirects` and `robots.txt`.

- \_redirects - To configure redirects. Read more on <a href="https://docs.netlify.com/routing/redirects/">Netlify</a>
- content/ - Data to render pages from, such as the blog.
- robots.txt - Instructions for site crawlers. Make sure to replace `https://yourwebsite.com` with your actual site URL

You can place CSS and JavaScript in your public/ directory, but be aware that those files will not be bundled or optimized in your final build.

#### `src/*`

##### `src/assets`

Contains all assets you want optimized by Astro (such as assets used in `<Picture />` components for example) must be placed in `src`.

##### `src/components`

Components are reusable units of code for your HTML pages. Snipcart components have been placed in the `/Snipcart` folder

##### `src/content`

Tis is where we store the content feeding the **content collection** system. Te `/products` folder contains the markdown files for the `products` content collection.

##### `src/data`

This directory contains data files that are accessible within any template throughout the project.

- `client.js` holds some information you may wish to define for a client. It's important to fill this file out with the correct information for your client, as many HTML meta tags, the sitemap, and robots.txt all use data from this file.
- `navData.json` holds data to create the navigation of your site. See more information in the [navigation via navData.json section](#navigationViaFrontMatter)

##### `src/layouts`

Layouts are Astro components that define the UI structure shared by one or more pages. The `BaseLayout.astro` file acts as a giant wrapper for each individual page, where the content is injected through the `<slot /> `component.

##### `src/pages`

Pages are a special kind of component used to create new pages on your site. A page can be an Astro component, or a Markdown file that represents some page of content for your site.
The `/products` sub-folder contains a `[...product].astro` file which is used to dynamically generate product pages based on the content collection data.

##### `src/styles`

It is a common convention to store your CSS, Less or Sass files in a `src/styles` directory. Snipcart theming overrides can be found in `snipcart.less`.

## Deployment

1. Ensure the astro.config.mjs, client.json, robots.txt, .env and \_redirects have been filled out.
2. Upload your .env file in your Netlify account under **_ Site configuration / Environment variables _**

## Acknowledgments

The author would like to acknowledge [Lloyd Atkinson](https://github.com/lloydjatkinson) - Creator of the [Astro Snipcart integration](https://astro-snipcart.vercel.app/) - Astro Snipcart is a free and open source e-commerce Astro integration that is built on top of the Snipcart platform, and serves as the base for this starter kit.

## Conclusion

I hope that this kit will prove useful to you. If you have any questions or would like to connect, feel free to reach out at `buckybuck` on Discord.

Happy coding!
**_Geoffrey_**

If you’ve found my work helpful or just want to fuel my next project, a coffee (or two!) would be much appreciated. ☕ Cheers, and thanks for your [support](buymeacoffee.com/buckybuck135)!

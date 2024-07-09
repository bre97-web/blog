# blog

A blog project that can be used as a template. The project is built by Astro and partially uses Vue and Tailwind CSS.

## Firebase configuration

You need to have a **firebase account**, a **firebase project** corresponding to this repository and **firebase service account** key to deploy to firebase.

If you do not need to deploy to firebase, please remove:

- .github/workflows/deplog-to-firebase.yml
- .github/workflows/firebase-hosting-pull-request.yml
- astro.config.firebase.mjs
- firebase.json
- `build:firebase` in `scripts` in package.json
- `firebase` in `devDependencies` in package.json

## Blog posts (/src/content/blogs)

**Please put all your blog posts here. Each blog post is categorized using collection.**

It is recommended to **set up a private repository for blog posts**. When the private repository is submitted, the build process of this forked repository is activated.
You need to modify the .github/workflow configuration file, and you also need to enable GitHub pages for the forked project.

## Action workflows

```plaintext

    |<----------------------------------------
    | update gh-pages branch                 ^
    \/                                       |
=-----------=           =--------------=     |
- blog repo -           - content repo -     |
=-----------=           =--------------=     |
    |                         |              |
    | when repo updates       |              |
    |       when repo updates |              |
    |<------------------------|              |
    |                                        |
    | dispatch trigger-build                 |
    \/                                       |
=====================================        |
= trigger-build                     =        |
= .github/workflows/deploy-to-*.yml =        |
=====================================        |
    |      |                                 |
    |      |                                 |
    |      \/                                |
    |      npm run build:firebase            |
    |      deploy to your firebase project   |
    \/                                       |
    npm run build:gh                         |
    deploy to your github-pages ------------>|
```

# Project Lincoln

![workflow status](https://github.com/csci312-f24/project-lincoln/actions/workflows/node.js.yml/badge.svg)

### Deployed application

https://lincoln.csci312.dev, available through [go/dormrecipes/](https://go.middlebury.edu/dormrecipes/)

### Description

This is an application to help connect students who want to cook around campus through recipes.

#### The application will include:

- login
- home page
  - search bar
  - recipe recommendations by section
- search page
- recipe page
  - edit recipe
  - delete recipe
- add recipe page
- profile page

#### Users will be able to:

- upload their own recipes with title, photo, description, prep & cook time, ingredients, and steps
  - view and edit their own recipes
  - view the ratings others have given them
- see the reviews they have left on other recipes
- keep a personal pantry of their own ingredients
- see other users' recipes (title, author, other ratings, etc.) 
  - rate the recipes 
  - share & print them out
- search for recipes by name, description, or ingredients

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom cross-env
💻 npx install-peerdeps --dev eslint-config-airbnb
💻 npm install -D eslint-import-resolver-alias
```

Testing dependencies installed with:
```
💻 npm i -S next-auth
💻 npm i -S next-test-api-route-handler
```

Other dependencies installed with:

```
💻 npm install -S prop-types
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.


### Build Local Server

```
💻 npm install 
💻 npm run build 
💻 npm run start 
```

### Development Server

1. Run Docker on your machine.

2. For **Windows**:
```
💻 npm run predev
💻 npm run dev-windows
💻 npx knex migrate:latest
💻 npx knex seed:run
```
& before stopping the server:
```
💻 npm run postdev
```

2. For **Mac**:
```
💻 npm run dev
💻 npx knex migrate:latest
💻 npx knex seed:run
```

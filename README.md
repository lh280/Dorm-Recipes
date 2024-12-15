# Project Lincoln

![workflow status](https://github.com/csci312-f24/project-lincoln/actions/workflows/node.js.yml/badge.svg)

### Deployed application

https://lincoln.csci312.dev, available through [go/dormrecipes/](https://go.middlebury.edu/dormrecipes/)

Dorm Recipes: Making dorm cooking simple and enjoyable.

### Description

This is an application to help connect students who want to cook around campus through recipes.

#### The application will include:

- login
- home page
  - search bar
  - recipe recommendations by section
- search page
- recipe page
  - delete recipe
  - add, edit, delete review
- add recipe page
- profile page

#### Users will be able to:

- upload their own recipes with title, description, prep & cook time, ingredients, and steps
  - view and delete their own recipes
  - view the ratings and reviews others have given them
- see the reviews they have left on other recipes
- keep a personal pantry of their own ingredients
- see other users' recipes (title, author, other ratings, etc.) 
  - rate the recipes 
  - share & print them out
- search for recipes by name, description, or ingredients

## Creation

### Necessary environment files

Make sure you have in .env.local:
- DATABASE_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET
- NEXTAUTH_URL

...and in .env.development.local:
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_HOST
- DB_PORT
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET
- NEXTAUTH_URL

### Build Local Server

```
💻 npm install 
💻 npm run build 
💻 npm run start 
```

### Run Development Server

1. Run Docker on your machine.
2. Install dependencies:
```
💻 npm install 
```

3. For **Windows**:
```
💻 npm run predev
💻 npm run dev-windows
💻 npx knex migrate:latest
💻 npx knex seed:run
```
& **before** stopping the server:
```
💻 npm run postdev
```

3. For **Mac**:
```
💻 npm run dev
💻 npx knex migrate:latest
💻 npx knex seed:run
```

**NOTE:** if changes have been made to the database since last running, you may need to run:
```
💻 npx knex migrate:rollback
```
before you can ```migrate:latest```.

### Testing

```
💻 npm test
💻 npm run lint
```

### Deploying

1. Run:
```
💻 git checkout main
💻 git pull origin main
```

**NOTE:** If **you** have never deployed **on your computer** before, run this command. You should only run this command ONCE, the first time you deploy on **your machine**:
```
💻 git remote add deploy <ssh-name>
```
**NOTE:** If your **app** has **not yet been deployed** before, run these commands. The ```secret-value```s should be retrieved from env.local. You should only run these commands **ONCE**, the **first time you deploy the app**:
```
💻 ssh git@csci312.dev secrets lincoln DATABASE_URL=<secret-value>
💻 ssh git@csci312.dev secrets lincoln GOOGLE_CLIENT_ID=<secret-value>
💻 ssh git@csci312.dev secrets lincoln GOOGLE_CLIENT_SECRET=<secret-value>
💻 ssh git@csci312.dev secrets lincoln NEXTAUTH_SECRET=<secret-value>
💻 ssh git@csci312.dev secrets lincoln NEXTAUTH_URL=<secret-value>
```

2. 
For **Windows**:
```
💻 cross-env NODE_ENV=production npx knex migrate:latest
💻 cross-env NODE_ENV=production npx knex seed:run
```
2. For **Mac**:
```
💻 NODE_ENV=production npx knex migrate:latest
💻 NODE_ENV=production npx knex seed:run
```

3. Run:
```
💻 npm run build
💻 git push deploy main
```

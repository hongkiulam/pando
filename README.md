## Pando Finance

#### Using Svelte, Typescript, Routify, Firebase, Netlify, PWA

A personal finance app for tracking monthly expenses.

### TODO

- [x] make pwa ready
- [] fix typescript untyped modules
- [x] isActive navigation
- [x] actions for getting? and setting firestore
- [x] bill type, income type, stock type all reference id instead
- [] should have a dynamic route for editing finance and stock data? edit/:id
- [] ~~stock addition and editing can be done in a modal~~
- [x] add stock setting tab
- [x] when changing expense type in dropdown, update amount to default amount
- [x] finances dont update when navigated to from add finance
- [] update bills text to say bills for next month etc...
- [] front page
- [x] charts
- [] export to excel document
- [] routes to everything
- [] stock stats open state, show more details

### Charts

- [x] Acc Savings against time
- [x] Acc Spending against time
- [x] Acc Stocks against time

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

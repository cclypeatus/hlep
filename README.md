This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## About the App

I've got two states: `data`, which holds a complex object/array, and `head`, which currently does nothing besides get logged in console. `data` is rendered using a few nested UI components, which provide input options to update a property/element of said `data`. These editing inputs can be activated concurrently, but I want only one property to be actively edited at a time, which will be specified by `head`. To edit a property, you have to first click an "edit" button (this is the "activate" mentioned earlier), then input a new value in the exposed textarea, and finally submit it.

## About the Bug

I've already incrementally reverted other changes and tried a few things, ultimately isolating the bug to this: When I test-change the "edit" button function so it `setHead()` to an array or object, it prevents the current functionality (expose the textarea) and undoes any edits that have been previously submitted.

## Navigating the Repository

Files are in `src/app/`, but main ones to look at are:
- `app.js` - where `data` and `head` states are defined
- `components.js` - UI components; of special note is `<Level />` (more below)

To cover all bases: `prog.yaml` stores test data, and `loader.js` prepares data before it gets rendered, but its logic is not relevant and has been commented out so nothing special is happening here.

`<Level />` is a mess in three parts: `branch()` expression, `<Leaf />` expression, and returning one of the above based on if the data at the current level is a list (which should be branched further) or leaf. `<Leaf />` is the main concern.

### Location (?) of Bug

`Ctrl + F` in `components.js` for `edit(true)` to find the functions that toggles the edit inputs:
- The `<span>` at L59-67 displays a leaf value while not being edited and can be clicked to toggle editing. Right now, it can't because of L62
- The`<button>` at L70-78 displays a button floated right that toggles editing too, but it should work as expected

Notably, you can click a button, edit, and submit a new value (even multiple times), but clicking on a leaf's span reverts evth everywhere (or at least it did for me).

## Things I've Tried

- Giving `setHead()` a primitive instead of an object/array (only the latter data types seem to bug)
- Stringifying `[]` and parsing it through a middleman function before giving it to `setHead()` (still bugs)
- In an earlier iteration (where this/a related bug was discovered), the `head` logic was completed so only one leaf could be edited as intended, but now submitting a new value wouldn't work. To see this:
  - `app.js:L44-46`, add `head={head}`
  - `components.js`, uncomment the two instances of `// head={head`
  - `components.js`, replace the two instances of `edit(true)` with `setHead(path)`
  - `components.js`, replace the two instances of `editing ?` with `head ?`
  - Tinkering with the `setData` call in `app.js:L23-33` here shows that the changes to `prev[step][...steps]` aren't kept by `prev`, even though this worked fine without these changes

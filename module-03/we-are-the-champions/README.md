# We Are The Champions

[Demo](https://scrimba.com/scrim/cEgBbytw)

We Are The Champions is a mock social media platform where you can post messages of endorsement about other users.
- Enter an endorsement message, your name, and the name of the person you want to endorse
- Read endorsements written by other users

# Technologies in use / Tech Stack / Built with

- HTML/CSS/JS
- Firebase Realtime Database
- Node.js
- Webpack

# Installation

To install We Are The Champions, please follow the steps below:
- Clone the repo to your machine
- Open the root of the project and install all dependencies with `npm i` / `yarn`
- In the root folder, create a `firebase.config.js` file that exports your web app's Firebase configuration:

```module.exports = {
  apiKey: "...",
  databaseURL: "...",
  ...
}
```

- Run the script to compile the JavaScript code: `npm run build`

# Description
## HTML

<p>All the HTML elements are placed inside a `&lt;main&gt;` container used for sizing and spacing purposes.</p>

<p>The container has 3 direct children elements for the principal components of the page:
- a `&lt;header&gt;` element containing the page's title and main logo
- a `&lt;section&gt;` element for the user inputs and button
- a `&lt;section&gt;` element acting as an empty placeholder for the dynamically generated endorsement posts</p>

<p>Each of the sections is comprised of a `&lt;header&gt;` for the section title, and a `&lt;div&gt;` holding the actual section content.</p>

## CSS
### Responsiveness

<p>The page is responive to changes in the window's width thanks to a combination of Flexbox, CSS Grid, and media queries.</p>

<p>When reaching past a width of 768px, the main container switches from a 1-column to a 2-column layout. While the main header always occupies the full width at the top of the container, the sections are placed side-by-side on larger windows.<br>This was achieved using CSS Grid's `grid-template-areas` property, combined with a media query.</p>

## JavaScript

# What I have learned

Working on We Are The Champions had me take a dive into Firebase basics. I learned how to create a local project through the CLI, use the Webpack bundler to compile my JavaScript code, and interact with the Firebase Realtime Database.<br>
As far as JavaScript techniques, I learned how to bind functions when dynamically attaching event handler callbacks to elements.

# What issues have I faced and how I resolved them

<p>When implementing the liking functionality, where a user can click on a button in a post to 'like' it, I was not sure how to pass a variable to a callback function. After some Googling, I learned about binding functions and providing a context to a function call.</p>

<p>In my JS code, I use .bind() to pass a reference to a post's entry in the database so that the correct update can be made upon a user's click.</p>

# Source

This project is done as part of the Scrimba Frontend Developer Career Path.
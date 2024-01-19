# We Are The Champions

[Demo](https://scrimba.com/scrim/cEgBbytw)

We Are The Champions is a mock social media platform where you can post messages of endorsement about other users.
- Enter an endorsement message, your name, and the name of the person you want to endorse, and click the <em>Publish</em> button to display the post on the endorsements wall
- As this is a mock application, no user authentication process was implemented

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
```
module.exports = {
  apiKey: "...",
  databaseURL: "...",
  ...
}
```
- Run the script to compile the JavaScript code: `npm run build`

# Description
## HTML

<p>All the HTML elements are placed inside a <code>main</code> container used for sizing and spacing purposes.</p>

<p>The container has 3 direct children elements for the principal components of the page:
- a <code>header</code> element containing the page's title and main logo
- a <code>section</code> element for the user inputs and button
- a <code>section</code> element acting as an empty placeholder for the dynamically generated endorsement posts</p>

<p>Each of the sections is comprised of a <code>header</code> for the section title, and a <code>div</code> holding the actual section content.</p>

## CSS

<p>I implemented responsiveness to changes in the window's width thanks to a combination of CSS Grid and media queries</p>

<p>When reaching past a window width of 768px, the main container switches from a 1-column to a 2-column layout. While the main header always occupies the full width at the top of the container, the sections are placed side-by-side on larger windows.<br>I implemented this dynamic layout with CSS Grid's <code>grid-template-areas</code> property, combined with a media query.</p>

<p>The dynamically generated post <code>article</code> elements are also made responsive with CSS Grid. I used the <code>minmax()</code> property to allow each card to resize as necessary, while specifying a minimum width for each.<br>With the <code>flex-wrap: wrap</code> setting, the cards automatically organize into rows to avoid overflowing the container.<br>This ensures a clean layout regardless of the width of the window or the number of posts to be rendered.</p>

## JavaScript
### Event Handlers

<p>The logic for creating a new endorsement post is embedded in a callback function, which is called whenever the user clicks the <em>Publish</em> button.</p>

<p>More specifically, the callback performs the following operations:
<ul>
  <li><strong>data gathering:</strong> retrieves the values inside the input fields and stores them in an object</li>
  <li><strong>input validation:</strong> ensures that all the input fields were filled by the user</li>
  <li><strong>database insertion:</strong> uploads the validated data object to the Realtime Database, which triggers a call to Firebase's <code>onValue()</code> function</li>
</ul>
</p>

### onValue Callback

<p>I used Firebase's <code>onValue()</code> function to specify the app's behavior whenever a change was made in the database.</p>

<p>The callback function loops through the endorsement entries in the database, and creates a formatted <code>article</code> for each.<br>
The CSS classes applied and callback functions attached to each element vary depending on the details of the post found in the database.<br>
Each card elements is then appended to the dedicated container in the HTML.</p>

### Helper functions

<p>Much of the logic contained in the callback function described above is abstracted away through a series of smaller helper functions that perform very specific subtasks.</p>

# What I have learned

Working on We Are The Champions had me take a dive into Firebase basics. I learned how to create a local project through the CLI, use the Webpack bundler to compile my JavaScript code, and interact with the Firebase Realtime Database.<br>
As far as JavaScript techniques, I learned how to bind functions when dynamically attaching event handler callbacks to elements.

# What issues have I faced and how I resolved them

<p>When implementing the liking functionality, where a user can click on a button in a post to 'like' it, I was not sure how to pass a variable to a callback function. After some Googling, I learned about binding functions and providing a context to a function call.</p>

<p>In my JS code, I use .bind() to pass a reference to a post's entry in the database so that the correct update can be made upon a user's click.</p>

# Source

This project is done as part of the Scrimba Frontend Developer Career Path.
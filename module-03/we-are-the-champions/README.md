# We Are The Champions

[PLACE_FOR_YOUR_IMAGE]

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

`module.exports = {
  apiKey: "...",
  databaseURL: "...",
  ...
}`
- Run the script to run the bundler: `npm run build`

# What I have learned

Working on We Are The Champions had me take a dive into Firebase basics. I learned how to create a local project through the CLI, use the Webpack bundler to compile my JavaScript code, and interact with the Firebase Realtime Database.
As far as JavaScript techniques, I learned how to bind functions when dynamically attaching event handler callbacks to elements.

# What issues have I faced and how I resolved them

When implementing the liking functionality, where a user can click on a button in a post to 'like' it, I was not sure how to pass a variable to a callback function. After some Googling, I learned about binding functions and providing a context to a function call.

In my JS code, I use .bind() to pass a reference to a post's entry in the database so that the correct update can be made upon a user's click.

# Source

This project is done as part of the Scrimba Frontend Developer Career Path.
# Inspirational Quote Page

[Demo](https://cute-clafoutis-9194d9.netlify.app/)

The Inspirational Quote Page is a single-page web app that displays a random quote on a random background image. Simply reload the page to get a new & inspiring quote!  
I completed this project as a review of web development basics, as well as a pretext for exploring the `webpack` code bundler.  
The result is a very simple application based using vanilla JS in combination with basic API calls, implemented with a highly (over-)engineered configuration.

# Technologies in use / Tech Stack / Built with

  - HTML/CSS/JS
  - Node.js
  - Webpack
  - Dotenv
  - Unsplash API

# Overview
## HTML
Given the minimalistic aspect of the design, I decided to focus on HTML semantics and avoid the use of generic `div` elements.  
The page' content is wrapped inside a `main` container, and simply consists of an empty `blockquote` element inside an anchor tag. The content inside the `blockquote` is filled dynamically using JavaScript.

## CSS
I used a combination of Flexbox and a media query to make the page responsive, though the overall layout remains largely unchanged across all window widths. 

## JavaScript

The core of the JavaScript code in this application resides in the `then()` method of Promise following the request made to the Unsplash API. In it, I use the API to get a random image object including a URL and an associated color.  
From there, two functions are called that use the extracted details to update the container's background and fill in the content in the `blockquote` element.  


# What I have learned

As was intended at the start, this project had me dive deeper into the Webpack documentation, and I was able to put some of its functionalities to use. I used aliasing and templating to organize my code into leaner files, and added the Dotenv plugin to store & retrieve my API keys.  
Moreover, this was my first experience using APIs in the context of a web app. Although I was somewhat out my depth with that part (see below), it felt nice to get a working (if somewhat clumsy) solution.

# What issues have I faced and how I resolved them

I completed this project prior to learning how to work with asynchronism, and had never used the `.then()` method before. After some Googling, I was able to pick up the basics of Promises and how to use them, but my solution still  heavily relies on copy-pasted code from the Unsplash API. It works but still feels a little makeshift.

# Source

This project is done as part of the Scrimba Frontend Developer Career Path.

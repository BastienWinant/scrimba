# Send to Pager

[Demo](https://65cb2c8f01067175b107dbf6--comforting-zuccutto-6bfaa9.netlify.app/)

Send to Pager simulates 

## Overview
### HTML
In my implementation of this project, I focused on the use of semantic HTML and generally avoided the use of generic `<div>` elements where applicable.  
The page content is placed inside a wrapping `<main>` container, which controls the responsive width of all elements inside it.  

The container has two `<section>` elements as direct children, representing the pager and the phone in the simulation. Both are comprised of a `<header>` element and subsections that contain the displays and clickable buttons.

### CSS
The page content is layed out in a single column, and did not require much adjusting with CSS. Most declarations in the CSS file pertain to applying colors to the different elements on the page.

Extensive use is made of Flexbox to space out and center elements. Most elements on the page act as column-oriented Flexbox containers. Following the DRY principle, the number of declarations used to achieve this was minimized by creating a utility class.

The design remains narrow even on wider screens, which made the responsiveness straightforward to implement. Most of it is taken care of through a combination of max-width on the main container and flexbox applied to its children.  
The 4-by-3 grid formed by the dials was made responsive using CSS Grid.

### JavaScript
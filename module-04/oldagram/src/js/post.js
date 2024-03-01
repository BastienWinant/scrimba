import Button from './button';

export default class Post {
  constructor(postObj) {
    this.postObj = postObj;
  }

  postHeader() {
    const postHeader = document.createElement("header");
    postHeader.classList.add("post-header", "border-box");
    
    const headerImg = document.createElement("img");
    headerImg.src = this.postObj.avatar;
    headerImg.classList.add("img", "small-img", "rounded-img");
    postHeader.appendChild(headerImg);

    const headingEl = document.createElement("hgroup");
    postHeader.appendChild(headingEl);

    const postUser = document.createElement("h4");
    postUser.textContent = this.postObj.name;
    postUser.classList.add("no-margin", "post-user");
    headingEl.appendChild(postUser);

    const postLocation = document.createElement("p");
    postLocation.textContent = this.postObj.location;
    postLocation.classList.add("no-margin", "post-location");
    headingEl.appendChild(postLocation);
    
    return postHeader;
  }

  postImg() {
    const imgEl = document.createElement("img");
    imgEl.src = this.postObj.post;
    imgEl.classList.add("img", "post-img");
    return imgEl;
  }

  postComment() {
    const sectionEl = document.createElement("section");
    sectionEl.classList.add("post-comment");

    const postUser = document.createElement("h4");
    postUser.classList.add("no-margin");
    postUser.textContent = this.postObj.username;
    sectionEl.appendChild(postUser);

    const postComment = document.createElement("p");
    postComment.classList.add("no-margin");
    postComment.textContent = this.postObj.comment;
    sectionEl.appendChild(postComment);

    return sectionEl;
  }

  postCaption() {
    const captionEl = document.createElement("figcaption");
    captionEl.classList.add("post-caption");

    // display clickable reaction buttons
    const sectionEl = document.createElement("section");
    sectionEl.classList.add("reaction-btns");

    sectionEl.appendChild(new Button("images/icon-heart.png").createElement());
    sectionEl.appendChild(new Button("images/icon-comment.png").createElement());
    sectionEl.appendChild(new Button("images/icon-dm.png").createElement());
    // sectionEl.appendChild(reactionBtn("images/icon-heart.png"));
    // sectionEl.appendChild(reactionBtn("images/icon-comment.png"));
    // sectionEl.appendChild(reactionBtn("images/icon-dm.png"));
    
    captionEl.appendChild(sectionEl);

    // display likes
    const pEl = document.createElement("p");
    pEl.classList.add("no-margin", "bold-text");
    pEl.textContent = `${this.postObj.likes} likes`;
    captionEl.appendChild(pEl);

    // display comment
    captionEl.appendChild(this.postComment());

    return captionEl;
  }

  postFigure() {
    const figureEl = document.createElement("figure");
    figureEl.classList.add("no-margin")

    figureEl.appendChild(this.postImg());
    figureEl.appendChild(this.postCaption());

    return figureEl;
  }

  createElement() {
    const postContainer = document.createElement("article");
    
    postContainer.appendChild(this.postHeader());
    postContainer.appendChild(this.postFigure());

    return postContainer;
  }
}
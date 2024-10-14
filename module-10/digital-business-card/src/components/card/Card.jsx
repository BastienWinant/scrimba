import React from "react"
import "./Card.css"
import PortraitImg from './profile.png'

const Card = () => {
  return (
    <>
      <div className="card">
        <img src={PortraitImg} alt="Portrait" className="card-img" />
        <header className="card-header">
          <hgroup>
            <h1 className="name">Bastien Winant</h1>
            <p className="title">Software Developer</p>
            <a href="#" className="portfolio-link">bwinant.website</a>
          </hgroup>
          <div className="contact-btns">
            <a href="#" className="contact-btn email-btn">
              <i class="fa-solid fa-envelope"></i>
              Email
            </a>
            <a href="#" className="contact-btn linkedin-btn">
              <i class="fa-brands fa-linkedin"></i>
              LinkedIn
            </a>
          </div>
        </header>
        <div className="card-body">
          <section className="card-body-section">
            <h2 className="card-body-title">About</h2>
            <p className="card-body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate atque earum voluptatibus velit necessitatibus ab aliquam nisi corrupti ipsum esse ea dolore magnam, id laboriosam accusantium deleniti, nihil cumque.</p>
          </section>
          <section className="card-body-section">
            <h2 className="card-body-title">Interests</h2>
            <p className="card-body-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore voluptatibus excepturi molestias explicabo animi. Possimus, sequi maxime cum porro harum eum? Nostrum modi alias illo nisi labore, placeat veniam laborum.</p>
          </section>
        </div>
        <footer className="card-footer">
          <a href="#" className="footer-link">
            <i class="fa-brands fa-square-x-twitter"></i>
          </a>
          <a href="#" className="footer-link">
            <i class="fa-brands fa-square-facebook"></i>
          </a>
          <a href="#" className="footer-link">
            <i class="fa-brands fa-square-instagram"></i>
          </a>
          <a href="#" className="footer-link">
            <i class="fa-brands fa-square-github"></i>
          </a>
        </footer>
      </div>
    </>
  )
}

export default Card
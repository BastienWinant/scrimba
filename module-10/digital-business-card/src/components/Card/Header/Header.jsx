import React from "react"
import './Header.css'

function Header() {
  return (
    <header className="card-header">
      <hgroup>
        <h1 className="name">Bastien Winant</h1>
        <p className="title">Software Developer</p>
        <a href="#" className="portfolio-link">bastienwinant.com</a>
      </hgroup>
      <div className="contact-links">
        <a href="#" className="contact-link email-link">
          <i class="fa-solid fa-envelope"></i>
          Email
        </a>
        <a href="#" className="contact-link linkedin-link">
          <i class="fa-brands fa-linkedin"></i>
          LinkedIn
        </a>
      </div>
    </header>
  )
}

export default Header
import './Header.css'

export default function Header() {
  return (
    <header className="card-header">
      <h1 className="name">Bastien Winant</h1>
      <p className="role">Software Engineer</p>
      <a href="#" className="portfolio-link">bastienwinant.com</a>
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
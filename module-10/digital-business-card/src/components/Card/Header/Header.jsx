import './Header.css'

export default function Header() {
  return (
    <header className="card-header">
      <h1 className="name">Bastien Winant</h1>
      <p className="role">Software Engineer</p>
      <a href="#" className="portfolio-link">bastienwinant.com</a>
      <div className="contact-links">
        <a href="mailto:bastien.winant@gmail.com" className="contact-link email-link">
          <i class="fa-solid fa-envelope"></i>
          Email
        </a>
        <a href="https://www.linkedin.com/in/winant/" className="contact-link linkedin-link" target='_blank'>
          <i class="fa-brands fa-linkedin"></i>
          LinkedIn
        </a>
      </div>
    </header>
  )
}
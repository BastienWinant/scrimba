import './Footer.css'

export default function Footer() {
  return (
    <footer className="card-footer">
      <a href="https://github.com/BastienWinant" className="footer-link" target='_blank'>
        <i class="fa-brands fa-square-github"></i>
      </a>
      <a href="https://x.com/WinantBastien" className="footer-link" target='_blank'>
        <i class="fa-brands fa-square-x-twitter"></i>
      </a>
      <a href="https://www.instagram.com/winantbastien/" className="footer-link" target='_blank'>
        <i class="fa-brands fa-square-instagram"></i>
      </a>
      <a href="https://www.facebook.com/bastien.winant.7" className="footer-link" target='_blank'>
        <i class="fa-brands fa-square-facebook"></i>
      </a>
    </footer>
  )
}
import { assetUrl } from '../data/projects';
export default function Footer() { return (<footer id="az-contact">
  <div className="connect-top">
    <h2 className="hand">Let’s connect!</h2>
    <div className="contact-links" aria-label="Footer contact links">
      <a href="mailto:aliyahkzaizay@gmail.com">Email ↗</a>
      <a href="https://www.linkedin.com/in/aliyah-zaizay/" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a href="https://github.com/aliyahkzaizay" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="footer-identity"><p>ALIYAH ZAIZAY</p><span>© 2026</span></div>
    <div className="footer-navigation" aria-label="Footer navigation">
      <a href="#az-journal">Home</a>
      <a href="#az-music">Work</a>
      <a href="#az-desktop">About</a>
      <a href={assetUrl("assets/Aliyah_Zaizay_Resume.pdf")} target="_blank" rel="noopener">Resume ↗</a>
    </div>
  </div>
</footer>); }

import { assetUrl } from '../data/projects';
export default function Navigation() { return (<nav aria-label="Primary navigation"><a className="signature" href="#az-journal">aliyah.z</a><div className="nav-links"><a href="#az-desktop">my desktop</a><a href="#az-music">my work</a><a href={assetUrl("assets/Aliyah_Zaizay_Resume.pdf")} target="_blank" rel="noopener">résumé ↗</a></div></nav>); }

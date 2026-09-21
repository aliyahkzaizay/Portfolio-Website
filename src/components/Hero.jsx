import { useState } from 'react';
import { animate, prefersReducedMotion } from '../motion';
export default function Hero() {
  const [flipped, setFlipped] = useState(false);
  function flip(event) {
    setFlipped(value => !value);
    animate(event.currentTarget, [{transform:'rotate(7deg) rotateY(-65deg)'},{transform:'rotate(7deg) rotateY(0)'}],500);
  }
  function tilt(event) {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const el = event.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty('--ry', `${(event.clientX-r.left-r.width/2)/r.width*16}deg`);
    el.style.setProperty('--rx', `${-(event.clientY-r.top-r.height/2)/r.height*12}deg`);
  }
  function resetTilt(event) {
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
  }
  return (<section className="journal" id="az-journal"><div className="journal-top"><span className="label">01 / Pages from my journal</span><span className="hand"></span></div><div className="journal-grid"><div data-pop><h1>Hi, I’m<em>Aliyah.</em></h1><p className="intro">I’m a computer science student at RPI with a minor in graphic design.</p><div className="contact-links" aria-label="Contact links"><a href="https://www.linkedin.com/in/aliyah-zaizay/" target="_blank" rel="noopener">LinkedIn ↗</a><a href="mailto:aliyahkzaizay@gmail.com">Email ↗</a><a href="https://github.com/aliyahkzaizay" target="_blank" rel="noopener">GitHub ↗</a></div><a className="journal-cta" href="#az-music">See my projects <span>↓</span></a></div><div className="portrait-wrap" data-pop><button className="portrait" onClick={flip} onPointerMove={tilt} onPointerLeave={resetTilt} type="button" aria-label="Turn over Aliyah’s photo placeholder" aria-pressed={flipped}><div className="portrait-scene" data-portrait-front hidden={flipped}><span className="photo-symbol" aria-hidden="true">▧</span><span>Your photo here<small></small></span></div><div className="portrait-note" data-portrait-back hidden={!flipped}>I like music, drawing,<br />and experimenting in Figma.</div><span className="hand">Aliyah Zaizay</span></button><div className="hand photo-caption"></div></div></div><div className="journal-stamps" data-pop><span>software + creativity</span><span>RPI / computer science</span><span>graphic design minor</span></div></section>
);
}

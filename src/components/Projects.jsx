import { useRef, useState } from 'react';
import { projects, playlists, assetUrl } from '../data/projects';
import { animate, pop, prefersReducedMotion, scrollToSection } from '../motion';

export default function Projects() {
  const [playlist, setPlaylist] = useState('dev');
  const [selected, setSelected] = useState('ceo');
  const infoRef = useRef(null);
  const playerRef = useRef(null);
  const gesture = useRef(null);
  const list = playlists[playlist];
  const project = projects[selected];
  const index = list.indexOf(selected);
  const design = playlist === 'design';
  const hint = list.length === 1
    ? 'One project in this playlist · scroll down for its story ↓'
    : 'Swipe or drag left for the next project · scroll down for its story ↓';

  function selectProject(id, direction = 1) {
    setSelected(id);
    animate(infoRef.current, [
      { transform: `translateX(${direction * 38}px)`, opacity: .5 },
      { transform: 'translateX(0)', opacity: 1 },
    ], 430);
  }
  function selectPlaylist(key) {
    setPlaylist(key);
    setSelected(playlists[key][0]);
    pop(playerRef.current);
  }
  function step(delta) {
    const next = index + delta;
    if (next >= 0 && next < list.length) selectProject(list[next], delta);
  }
  function pointerDown(event) {
    if (event.target.closest('button') || event.button !== 0) return;
    gesture.current = { x: event.clientX, y: event.clientY, dx: 0, axis: null };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function pointerMove(event) {
    const g = gesture.current;
    if (!g) return;
    const dx = event.clientX - g.x, dy = event.clientY - g.y;
    if (!g.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 10) {
      g.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y';
    }
    if (g.axis === 'x') {
      g.dx = dx;
      if (!prefersReducedMotion()) infoRef.current.style.transform = `translateX(${Math.max(-75, Math.min(75, dx * .55))}px)`;
    }
  }
  function pointerEnd(event, cancel = false) {
    const g = gesture.current;
    gesture.current = null;
    infoRef.current.style.transform = '';
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!cancel && g?.axis === 'x' && Math.abs(g.dx) > 45) step(g.dx < 0 ? 1 : -1);
  }
  function preview(detail = false) {
    return project.image
      ? <img {...(detail ? { 'data-detail-image': true } : { 'data-track-image': true })} src={assetUrl(project.image)} alt={`${project.title} project preview`} draggable={false} />
      : detail ? <div className="no-image" data-detail-placeholder>{project.title}</div>
        : <span data-track-placeholder>{project.title}</span>;
  }

  return <section className="music" id="az-music">
    <div className="music-heading"><div><div className="label">03 / Projects</div><h2>My projects.</h2></div></div>
    <div className="music-shell" data-pop>
      <aside className="library" aria-label="Project playlists">
        <p>Your library / project playlists</p>
        {Object.keys(playlists).map(key => <button className="playlist" type="button" key={key} data-playlist={key} aria-pressed={playlist === key} onClick={() => selectPlaylist(key)}>
          <span className="playlist-art">{key === 'dev' ? '</>' : '✳'}</span>
          <span><strong>{key === 'dev' ? 'Development' : 'Design & Data Viz'}</strong><small>{playlists[key].length} {playlists[key].length === 1 ? 'project' : 'projects'}</small></span>
        </button>)}
      </aside>
      <div className="player-main" ref={playerRef}>
        <div className="album-heading" style={design ? { background: 'linear-gradient(135deg,#695881,#332b40)' } : undefined}>
          <div className="playlist-cover" aria-hidden="true" style={design ? { background: '#cbb9e3' } : undefined}>
            <small>THE AZ COLLECTION</small><span data-cover-title style={{ whiteSpace: 'pre-line' }}>{design ? 'MAKE\nIT CLICK.' : 'BUILD\nTHINGS.'}</span>
          </div>
          <div><span className="label">Project playlist</span><h3 data-playlist-title>{design ? 'Design & Data Visualization' : 'Development'}</h3><p data-playlist-count>Aliyah Zaizay · {list.length} {list.length === 1 ? 'project' : 'projects'}</p></div>
        </div>
        <div className="songs" aria-label="Projects in this playlist" data-songs>
          {list.map((id, i) => <button className="song" type="button" key={id} data-song={id} aria-pressed={id === selected} onClick={() => selectProject(id)}>
            <span className="song-number">{String(i + 1).padStart(2, '0')}</span>
            <span><strong>{projects[id].title}</strong><small>{projects[id].kind}</small></span><span className="song-tag">Explore ↗</span>
          </button>)}
        </div>
        <div className="now-playing" data-swipe aria-label="Selected project. Swipe left for next, right for previous." onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={e => pointerEnd(e, true)}>
          <div className="track-art">{preview()}</div>
          <div className="now-info" ref={infoRef} aria-live="polite"><span className="label">Now exploring</span><h4 data-now-title>{project.title}</h4><p data-now-kind>{project.kind}</p>
            <div className="play-controls">
              <button type="button" data-prev disabled={index === 0} aria-label="Previous project" onClick={() => step(-1)}>← Prev</button>
              <button className="open-project" type="button" data-open onClick={() => { scrollToSection('az-project-details'); pop(document.getElementById('az-project-details')); }}>Project details ↓</button>
              <button type="button" data-next disabled={index === list.length - 1} aria-label="Next project" onClick={() => step(1)}>Next →</button>
            </div>
          </div>
        </div>
        <p className="swipe-hint" data-swipe-hint>{hint}</p>
      </div>
    </div>
    <article className="project-details" id="az-project-details" aria-live="polite">
      <div className="label">Project details</div><div className="details-grid">
        <div data-pop><h3 data-detail-title>{project.title}</h3><p data-detail-description>{project.description}</p><p className="detail-tech" data-detail-tech>{project.tech}</p>
          {project.link ? <a className="detail-link" data-detail-link href={project.link} target="_blank" rel="noopener">{project.linkLabel || (selected === 'os' ? 'Open Figma prototype ↗' : 'View repository ↗')}</a> : <p data-link-missing>No public project link available yet.</p>}
        </div>
        <div data-pop>{preview(true)}<div className="detail-notes" data-detail-notes>{project.notes}</div></div>
      </div>
    </article>
  </section>;
}

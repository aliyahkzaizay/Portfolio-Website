const activeAnimations = new WeakMap();
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
export function animate(element, frames, duration = 550) {
  if (!element || prefersReducedMotion()) return;
  activeAnimations.get(element)?.cancel();
  const animation = element.animate(frames, {
    duration, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'none',
  });
  activeAnimations.set(element, animation);
}
export function pop(element) {
  animate(element, [
    { transform: 'translateY(48px) scale(.92)', opacity: .3 },
    { transform: 'translateY(-5px) scale(1.01)', opacity: 1, offset: .78 },
    { transform: 'translateY(0) scale(1)', opacity: 1 },
  ], 750);
}
export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start',
  });
}

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets the document scroll position whenever React Router changes pages.
 * This is necessary because client-side route changes do not reload the page,
 * so the browser otherwise keeps the previous page's scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    // Prevent the global `html { scroll-behavior: smooth; }` rule from
    // animating route changes. New pages should begin at the top immediately.
    root.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);
    root.scrollTop = 0;
    document.body.scrollTop = 0;

    const frame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname]);

  return null;
}

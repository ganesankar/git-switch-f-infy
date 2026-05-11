import { useEffect, useState } from 'react';
import './FloatingCat.css';

const BASE_BOTTOM = 20;
const FOOTER_GAP = 8;

export default function FloatingCat({ footerRef }) {
  const [bottomPx, setBottomPx] = useState(BASE_BOTTOM);

  useEffect(() => {
    const update = () => {
      const footer = footerRef?.current;
      if (!footer) {
        setBottomPx(BASE_BOTTOM);
        return;
      }
      const footerTop = footer.getBoundingClientRect().top;
      const overlap = window.innerHeight - footerTop + FOOTER_GAP;
      setBottomPx(Math.max(BASE_BOTTOM, overlap));
    };

    let rafId = 0;
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [footerRef]);

  return (
    <div className="gl-cat" aria-hidden="true" style={{ bottom: `${bottomPx}px` }}>
      <article role="img" aria-label="Cartoon of a black cat drawn in cute kawaii style">
        <div className="shadow"></div>
        <div className="tail"></div>
        <div className="body">
          <div className="leg"></div>
          <div className="leg"></div>
          <div className="paw"></div>
          <div className="paw"></div>
        </div>
        <div className="head">
          <div className="ear"></div>
          <div className="ear"></div>
          <div className="face">
            <div className="whisker"></div>
            <div className="whisker"></div>
            <div className="whisker"></div>
            <div className="whisker"></div>
            <div className="eye"></div>
            <div className="eye"></div>
            <div className="nose"></div>
          </div>
        </div>
      </article>
    </div>
  );
}

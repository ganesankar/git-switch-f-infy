import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { site } from '../site.config.js';
import './FloatingCat.css';

const REPO_URL = `https://github.com/${site.defaultAuthor.handle}`;

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

  const showCatToast = () =>
    toast(
      (
        <span>
          <b> My Family Cats</b>
         <br/>
         <br/>
         <img src="https://cdn-icons-png.flaticon.com/64/16461/16461811.png" alt="My Family Cats" width={100} height={100} />
         <br/>
         <br/>
         <b> My Family Cats</b>
         <br/>
         <br/>
         <img src="https://cdn-icons-png.flaticon.com/64/16461/16461811.png" alt="My Family Cats" width={100} height={100} />
         <br/>
         <br/>
         <b> My Family Cats</b>
         <br/>
         <br/>
         <img src="https://cdn-icons-png.flaticon.com/64/16461/16461811.png" alt="My Family Cats" width={100} height={100} />
        </span>
      ),
      { icon: '😜', duration: 6000 },
    );

  return (
    <a
      className="gl-cat"
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.defaultAuthor.name} on GitHub — kawaii cat`}
      style={{ bottom: `${bottomPx}px` }}
      /* onClick={showCatToast} */
    >
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
    </a>
  );
}

import React, { useEffect, useRef } from "react";

/**
 * MegaMenu
 * - props.item : objet menu envoyé depuis Menu (voir ton API)
 * - props.onClose : fonction pour fermer
 * - props.icons : objet icons (optionnel)
 */
export default function MegaMenu({ item, onClose, icons = {} }) {
  const wrapperRef = useRef();

  useEffect(() => {
    // focus trap minimal & close on ESC
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // if (!item) return null;
  // Mode desktop : item sélectionné
  // Mode mobile : montrer tout le menu même si item=null
  const children = item?.children || [];
  const quicklinks = item?.mega_links || [];
  // helper: children (niveau 1)
  // const children = item.children || [];

  // quicklinks: prefer item.mega_links, sinon empty
  // const quicklinks = item.mega_links && item.mega_links.length ? item.mega_links : [];
  // const children = item === "all"
  // ? allItems                 // ← affiche tout le menu
  // : (item?.children || []);  // ← affiche les enfants normaux

  return (

    <div className="sdj-mega-wrapper" role="dialog" aria-modal="true" ref={wrapperRef}>
      {/* <div className="sdj-mega-overlay" onClick={onClose} aria-hidden="true" /> */}

      <div className="sdj-mega-panel" role="document">
        <button className="sdj-mega-close" onClick={onClose} aria-label="Fermer le menu">✕</button>

        <div className="sdj-mega-columns">
          {/* svg center */}
          <div className="decor-rect-center"></div>
          <div className="decor-arc-center-bottom"></div>

          {/* LEFT: white panel with sections */}
          <div className="sdj-mega-left">
            {/* SVG */}
            {/* <div className="decor-arc-top"></div> */}
            
            <ul className="sdj-mega-sections">
              {/* Top: the main title clickable */}
              <li className="sdj-mega-section-title">
                <button className="section-toggle" aria-expanded="true">{item.title}</button>
              </li>

              {children.length === 0 && (
                <li className="sdj-mega-empty">Aucun sous-menu</li>
              )}

              {children.map((child) => (
                <li key={child.id} className="sdj-mega-section">
                  <div className="section-head">
                    <button
                      className="section-toggle"
                      aria-expanded="false"
                      onClick={(e) => {
                        // toggle open/close: use CSS :focus-within or toggle class
                        const el = e.currentTarget.closest(".sdj-mega-section");
                        el.classList.toggle("open");
                      }}
                    >
                      <span className="chevron">▾</span>
                    </button>

                    <a href={child.url || "#"} className="section-link">{child.title}</a>
                  </div>

                  {/* sous-items (si existants) */}
                  {child.children && child.children.length > 0 && (
                    <ul className="subitems">
                      {child.children.map((sub) => (
                        <li key={sub.id} className="subitem">
                          <a href={sub.url || "#"}>{sub.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          

          {/* RIGHT: blue panel with quicklinks */}
          <aside className="sdj-mega-right" aria-label="Liens rapides">
            <div className="quicklinks-area">
              <button className="adh-btn">ESPACE ADHÉRENTxxx</button>
              <ul className="quicklinks-list">
                {quicklinks.map((ql, i) => (
                  ql.label ? (
                    <li key={i}>
                      <a href={ql.url || "#"}>
                        <span className="ql-icon" aria-hidden>▣</span>
                        {ql.label}
                      </a>
                    </li>
                  ) : null
                ))}
              </ul>

              {/* fallback links if none */}
              {quicklinks.length === 0 && (
                <ul className="quicklinks-list">
                  <li><a href="#">Actualités</a></li>
                  <li><a href="#">Agenda</a></li>
                  <li><a href="#">Publications</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// export default function MegaMenu({ item, allItems = [], onClose, icons = {} }) {
//   const wrapperRef = useRef();

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", onKey);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   // ---------------------------
//   // Gestion : item = "all"  → MegaMenu complet
//   // ---------------------------
//   const children =
//     item === "all"
//       ? allItems // ← affiche tout le menu (maquette XD)
//       : item?.children || [];

//   const quicklinks = item?.mega_links || [];

//   return (
//     <div className="sdj-mega-wrapper" role="dialog" aria-modal="true" ref={wrapperRef}>
//       <div className="sdj-mega-panel" role="document">
//         <button className="sdj-mega-close" onClick={onClose} aria-label="Fermer le menu">
//           ✕
//         </button>

//         <div className="sdj-mega-columns">
//           <div className="decor-rect-center"></div>
//           <div className="decor-arc-center-bottom"></div>

//           {/* LEFT */}
//           <div className="sdj-mega-left">
//             <ul className="sdj-mega-sections">

//               {/* Cas MegaMenu complet = pas de title */}
//               {item !== "all" && (
//                 <li className="sdj-mega-section-title">
//                   <button className="section-toggle" aria-expanded="true">
//                     {item.title}
//                   </button>
//                 </li>
//               )}

//               {children.length === 0 && <li className="sdj-mega-empty">Aucun sous-menu</li>}

//               {children.map((child) => (
//                 <li key={child.id} className="sdj-mega-section">
//                   <div className="section-head">
//                     <button
//                       className="section-toggle"
//                       aria-expanded="false"
//                       onClick={(e) => {
//                         const el = e.currentTarget.closest(".sdj-mega-section");
//                         el.classList.toggle("open");
//                       }}
//                     >
//                       <span className="chevron">▾</span>
//                     </button>

//                     <a href={child.url || "#"} className="section-link">
//                       {child.title}
//                     </a>
//                   </div>

//                   {child.children && child.children.length > 0 && (
//                     <ul className="subitems">
//                       {child.children.map((sub) => (
//                         <li key={sub.id} className="subitem">
//                           <a href={sub.url || "#"}>{sub.title}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* RIGHT */}
//           <aside className="sdj-mega-right">
//             <div className="quicklinks-area">
//               <button className="adh-btn">ESPACE ADHÉRENT</button>
//               <ul className="quicklinks-list">
//                 {quicklinks.map((ql, i) =>
//                   ql.label ? (
//                     <li key={i}>
//                       <a href={ql.url || "#"}>
//                         <span className="ql-icon">▣</span>
//                         {ql.label}
//                       </a>
//                     </li>
//                   ) : null
//                 )}
//               </ul>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

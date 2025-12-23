
// import "./Hero.css";

// export default function Hero({ hero }) {
//   if (!hero) return null;

//   const { image, badge_text, search } = hero;

//   return (
//     <section className="sdj-hero">
//       {/* IMAGE DE FOND */}
//       <div
//         className="sdj-hero-bg"
//         style={{ backgroundImage: `url(${image})` }}
//         aria-hidden="true"
//       />

//       {/* CONTENU AU-DESSUS */}
//       <div className="sdj-hero-overlay">
        
//         {/* SEARCH */}
//         {search && (
//           <div className="sdj-hero-search">
//             <div className="sdj-search-input">
//               <input
//                 type="search"
//                 placeholder={search.placeholder}
//                 aria-label="Recherche"
//               />
//               <span className="sdj-search-icon">🔍</span>
//             </div>

//             {Array.isArray(search.links) && (
//               <ul className="sdj-hero-search-links">
//                 {search.links.map((link, i) => (
//                   <li key={i}>
//                     <a href={link.url}>{link.label}</a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {/* BADGE TEXTE */}
//         {badge_text && (
//           <div className="sdj-hero-badge">
//             {badge_text}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
import "./Hero.css";

export default function Hero({ hero }) {
  if (!hero) return null;

  const { image, badge_text, search } = hero;

  return (
    <section className="sdj-hero">
      {/* IMAGE */}
      <div
        className="sdj-hero-bg"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />

      {/* SEARCH */}
      {search && (
        <div className="sdj-hero-search-wrapper">
          <div className="sdj-hero-search">
            <input
              type="search"
              placeholder={search.placeholder}
              aria-label="Recherche"
            />
            <span className="sdj-search-icon">🔍</span>
          </div>

          {Array.isArray(search.links) && (
            <ul className="sdj-hero-search-links">
              {search.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* BADGE */}
      {badge_text && (
        <div className="sdj-hero-badge">
          {badge_text}
        </div>
      )}
    </section>
  );
}


// // MegaMenu.jsx
// import React from "react";
// import "./MegaMenu.css";

// export default function MegaMenu({ id, onClose }) {
//   return (
//     <div className="sdj-mega-menu">
//       <button className="mega-close" onClick={onClose}>✕</button>

//       <div className="mega-left">
//         <h2>Section {id}</h2>
//       </div>

//       <div className="mega-right">
//         <p>Contenu dynamique ici…</p>
//       </div>
//     </div>
//   );
// }
// MegaMenu.jsx
import React from "react";
import "./MegaMenu.css";

// export default function MegaMenu({ data, onClose }) {
//   if (!data) return null;

//   return (
//     <div className="sdj-mega-menu">

//       {/* Bouton close */}
//       {/* <button className="mega-close" onClick={onClose}>✕</button> */}

//       {/* Colonne gauche */}
//       {/* <div className="mega-left">
//         {data.map((section) => (
//           <div key={section.id} className="mega-section">
//             <div className="mega-title">{section.title}</div>

//             {section.children?.length > 0 && (
//               <div className="mega-sub">
//                 {section.children.map((child) => (
//                   <div key={child.id} className="mega-sub-item">
//                     <span className="bullet"></span>
//                     {child.title}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div> */}

//       {/* Colonne droite */}
//       {/* <div className="mega-right">

//         <button className="adh-btn">Espace adhérent</button>

//         <ul className="quick-links">
//           <li>Actualités</li>
//           <li>Agenda</li>
//           <li>Publications</li>
//           <li>Lettre d’information</li>
//           <li>Espace presse</li>
//           <li>Contact</li>
//           <li>Extranet</li>
//         </ul>

//       </div> */}
//     </div>
//   );
// }

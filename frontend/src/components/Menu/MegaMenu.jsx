// MegaMenu.jsx
import React from "react";
import "./MegaMenu.css";

export default function MegaMenu({ id, onClose }) {
  return (
    <div className="sdj-mega-menu">
      <button className="mega-close" onClick={onClose}>✕</button>

      <div className="mega-left">
        <h2>Section {id}</h2>
      </div>

      <div className="mega-right">
        <p>Contenu dynamique ici…</p>
      </div>
    </div>
  );
}

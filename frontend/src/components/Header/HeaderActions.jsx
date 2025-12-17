import React from "react";
import "./HeaderActions.css";

export default function HeaderActions({ iconAdherent, iconSearch, iconEyesOff }) {
  return (
    <div className="sdj-actions" role="group" aria-label="Header actions">
      <div className="sdj-adh" role="button" tabIndex={0} aria-label="Espace adhérent">
        {iconAdherent ? (
          <img src={iconAdherent} alt="" aria-hidden="true" />
        ) : (
          <span className="sdj-adh-placeholder" />
        )}
        <span>ESPACE ADHÉRENT</span>
      </div>  

      <button className="sdj-action-btn" aria-label="Recherche">
        {iconSearch ? <img src={iconSearch} alt="" aria-hidden="true" /> : "🔍"}
      </button>

      <button className="sdj-eyesOff-btn" aria-label="Accessibilité">
        {iconEyesOff ? <img src={iconEyesOff} alt="" aria-hidden="true" /> : "👁‍🗨"}
      </button>
    </div>
  );
}

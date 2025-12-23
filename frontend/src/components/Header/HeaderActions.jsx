import "./HeaderActions.css";

export default function HeaderActions({ iconUser, iconSearch, iconEyeOff }) {
  return (
    <div className="sdj-actions" role="group" aria-label="Header actions">
      
      <div className="sdj-adh" role="button" tabIndex={0} aria-label="Espace adhérent">
         {iconUser ? (
          <img src={iconUser} lt="Icône espace adhérent" aria-hidden="true" />
        ) : (
          <span className="sdj-adh-placeholder" />
        )}
        <span>ESPACE ADHÉRENT</span>
      </div>

      
      <button className="sdj-action-btn" aria-label="Recherche">
        {iconSearch ? <img src={iconSearch} alt="Icône search" aria-hidden="true" /> : "🔍"}
      </button>

      <button className="sdj-eyesOff-btn" aria-label="Accessibilité">
         {iconEyeOff ? <img src={iconEyeOff} alt="Icône Eye off" aria-hidden="true" /> : "👁‍🗨"}
      </button>
    </div>
  );
}

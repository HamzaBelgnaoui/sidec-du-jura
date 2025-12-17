
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Menu.css";

export default function Menu({ onOpenMega, mobile = false, onLoaded }) {
  const [items, setItems] = useState([]);
  const [hovered, setHovered] = useState(null);   // hover by mouse
  const [openItem, setOpenItem] = useState(null); // click-open (mobile / desktop)
  const hoverTimers = useRef({});                 // keep enter/leave timers to avoid flicker

  // useEffect(() => {
  //   axios
  //     .get("http://sidec-du-jura.local/wp-json/sidec/v1/menu")
  //     .then(res) => 
  //       setItems(res.data || []);
  //       if (onLoaded) onLoaded(res.data || []); // <-- nouvelle ligne
  //     }
  //   )
  //     .catch(() => setItems([]));
  // }, []);
  useEffect(() => {
    axios
      .get("http://sidec-du-jura.local/wp-json/sidec/v1/menu")
      .then((res) => {
        setItems(res.data || []);
        
        // ←←← nouvelle ligne pour envoyer le menu complet au parent (Header.jsx)
        if (onLoaded) onLoaded(res.data || []);
      })
      .catch(() => setItems([]));
  }, []);

  // Helpers: small delays prevent flicker between link and dropdown
  const startHover = (id) => {
    clearTimeout(hoverTimers.current[id]);
    hoverTimers.current[id] = setTimeout(() => setHovered(id), 80); // enter delay
  };
  const endHover = (id) => {
    clearTimeout(hoverTimers.current[id]);
    hoverTimers.current[id] = setTimeout(() => {
      // only clear if not click-open
      if (openItem !== id) setHovered((prev) => (prev === id ? null : prev));
    }, 140); // leave delay allows moving to dropdown
  };

  const toggleDropdown = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  const handleLinkClick = (e, item) => {
    // const hasChildren = item.children && item.children.length > 0;
    // const hasChildren = false; // Désactive dropdown, tout passe en mega menu
    const hasChildren = item.children && item.children.length > 0;
    // if (!hasChildren) {
      
    //   e.preventDefault();
    //   if (onOpenMega) onOpenMega(item);
      
    //   return;
    // }
    // if (!mobile) {
    //   e.preventDefault();
    //   if (onOpenMega) onOpenMega(item);
    //   return;
    // }
    
    // e.preventDefault();
    // toggleDropdown(item.id);
    // Desktop only
    if (item.css_class === "plan-du-site") {
      e.preventDefault();
      onOpenMega("all");
      return;
    }
    if (!mobile) {

      // 1er click : ouvrir dropdown
      if (!openItem || openItem !== item.id) {
        e.preventDefault();
        setOpenItem(item.id);
        return;
      }

      // 2e click : ouvrir MegaMenu
      e.preventDefault();
      onOpenMega(item);
      return;
    }
  };

  const renderMenuItems = (menuItems, level = 0) => {
    // const className = level === 0 ? "sdj-nav" : "dropdown";

    const className =
      level === 0
        ? mobile
          ? "sdj-nav mobile"
          : "sdj-nav"
          : "dropdown";

    return (
      <ul className={className} role={level === 0 ? "menubar" : "menu"}>
        {menuItems.map((item, index) => {
          // const hasChildren = item.children && item.children.length > 0;
          // const hasChildren = false; // Désactive dropdown, tout passe en mega menu
          const hasChildren = item.children && item.children.length > 0;

          const hoverActive = hovered === item.id;
          const clickOpen = openItem === item.id;
          // visible if hovered OR click-open
          const isVisible = hoverActive || clickOpen;

          return (
            <li
              key={item.id}
              className={hasChildren ? "has-children" : ""}
              onMouseEnter={() => !mobile && startHover(item.id)}
              onMouseLeave={() => !mobile && endHover(item.id)}
          
              // keep dropdown accessible
              aria-haspopup={hasChildren ? "true" : undefined}
              aria-expanded={hasChildren ? isVisible : undefined}
              role="none"
            >
              <a
                href={item.url || "#"}
                role="menuitem"
                tabIndex={0}
                className={isVisible ? "active-hover" : ""}
                onClick={(e) => handleLinkClick(e, item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLinkClick(e, item);
                  } else if (e.key === "Escape") {
                    setHovered(null);
                    setOpenItem(null);
                  }
                }}
                // keep pointer-events on link
              >
                {isVisible && item.hover_title ? item.hover_title : item.title}

                {/* mobile arrow shown only on mobile when item has children */}
                {/* {mobile && hasChildren && (
                  <button className="mobile-arrow" aria-hidden>
                    {isVisible ? "˄" : "˅"}
                  </button>
                )} */}
              </a>

            

              {hasChildren && (
                <div
                  className={`dropdown-container ${isVisible ? "show" : ""}`}
                >
                  {renderMenuItems(item.children, level + 1)}
                </div>
              )}

              {/* desktop-only visible separator between items (kept in DOM) */}
              {level === 0 && index < menuItems.length - 1 && (
                <span className="sdj-separator" aria-hidden></span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // return renderMenuItems(items);
  return (
    <div className={mobile ? "mobile-nav-wrapper" : ""}>
      {renderMenuItems(items, mobile ? "mobile" : 0)}
    </div>
  );
}

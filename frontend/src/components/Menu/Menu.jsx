
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css";

export default function Menu({ onOpenMega }) {
  const [items, setItems] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    axios
      .get("http://sidec-du-jura.local/wp-json/sidec/v1/menu")
      .then((res) => setItems(res.data || []))
      .catch(() => setItems([]));
  }, []);

  const renderMenuItems = (menuItems, level = 0) => {
    const className = level === 0 ? "sdj-nav" : "dropdown";

    return (
      <ul className={className}>
        {menuItems.map((item, index) => {
          const hasChildren = item.children?.length > 0;
          const isHover = hovered === item.id;

          return (
            <li
              key={item.id}
              className={hasChildren ? "has-children" : ""}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >

              {/* --- LINK --- */}
              <a
                href={item.url || "#"}
                className={isHover ? "active-hover" : ""}
                onClick={(e) => {
                  if (!hasChildren) {
                    e.preventDefault();
                    onOpenMega(item.id);
                  }
                }}
              >
                {isHover ? item.hover_title : item.title}
              </a>

              {/* --- DROPDOWN --- */}
              {hasChildren && (
                <div className={`dropdown-container ${isHover ? "show" : ""}`}>
                  {renderMenuItems(item.children, level + 1)}
                </div>
              )}

              {/* --- SEPARATEUR --- */}
              {level === 0 && index < menuItems.length - 1 && (
                <span className="sdj-separator"></span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return renderMenuItems(items);
}

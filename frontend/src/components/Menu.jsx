
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
    const [items, setItems] = useState([]);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        axios
            .get("http://sidec-du-jura.local/wp-json/sidec/v1/menu")
            .then(res => setItems(res.data))
            .catch(err => console.log(err));
    }, []);

    const renderMenuItems = (menuItems, level = 0) => {
        return (
            <ul className={level === 0 ? "sdj-nav" : "dropdown"}>
                {menuItems.map((item, index) => (
                    <li
                        key={item.id}
                        className={item.children.length > 0 ? "has-children" : ""}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <a
                            href={item.url}
                            className={hovered === item.id ? "active-hover" : ""}
                        >
                            {hovered === item.id ? item.hover_title : item.title}
                        </a>

                        {/* CHILDREN DROPDOWN */}
                        {item.children.length > 0 && (
                            <div className={`dropdown-container ${hovered === item.id ? "show" : ""}`}>
                                {renderMenuItems(item.children, level + 1)}
                            </div>
                        )}

                        {/* SEPARATOR uniquement niveau 0 */}
                        {level === 0 && index < menuItems.length - 1 && (
                            <span className="sdj-separator">|</span>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return renderMenuItems(items);
}

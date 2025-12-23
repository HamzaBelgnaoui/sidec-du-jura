import React, { useEffect, useState } from "react";

import "../Menu/MegaMenu.css";

import Menu from "../Menu/Menu";
import Logo from "./Logo";
import HeaderActions from "./HeaderActions";
import MegaMenu from "../Menu/MegaMenu.jsx";
import Hero from "../Hero/Hero.jsx";

import { getSiteSettings } from "../../api";
import "./Header.css";

export default function Header() {
  const [branding, setBranding] = useState(null);
  const [hero, setHero] = useState(null);

  const [megaOpen, setMegaOpen] = useState(false);
  const [megaItem, setMegaItem] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      if (!data) return;

      setBranding(data.branding || null);
      setHero(data.hero || null);
    }

    load();
  }, []);

  const openMega = (item) => {
    setMegaItem(item);
    setMegaOpen(true);
  };

  const closeMega = () => {
    setMegaOpen(false);
    setMegaItem(null);
  };

  return (
    <header className="sdj-header">
      {/* NAV BAR */}
      <div className="sdj-header-container">
        <Logo logo={branding?.logo} />

        <nav className="sdj-menu">
          <Menu onOpenMega={openMega} />
        </nav>

        <HeaderActions
          iconUser={branding?.icons?.user}
          iconSearch={branding?.icons?.search}
          iconEyeOff={branding?.icons?.eye_off}
        />

        <button
          className="sdj-burger mobile-only"
          onClick={() => setMegaOpen(true)}
        >
          <img src={branding?.icons?.burger} alt="Menu" />
        </button>
      </div>

      {/* MEGA MENU */}
      {megaOpen && (
        <MegaMenu item={megaItem} onClose={closeMega} />
      )}

      {/* HERO */}
      <Hero hero={hero} />
    </header>
  );
}

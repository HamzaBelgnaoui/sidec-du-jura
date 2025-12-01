import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu.jsx";
import Logo from "./Logo.jsx";
import HeaderActions from "./HeaderActions.jsx";
import MegaMenu from "../Menu/MegaMenu.jsx";
import { getGlobalSettings, getMediaURL } from "../../api";
import "./Header.css";
 
export default function Header() {
  const [logo, setLogo] = useState(null);
  const [icons, setIcons] = useState({});
  const [heroImg, setHeroImg] = useState(null);

  // MegaMenu (Ouvre le grand menu 1600x770)
  const [megaMenu, setMegaMenu] = useState(null);

  useEffect(() => {
    async function load() {
      const acf = await getGlobalSettings();
      if (!acf) return;

      setLogo(await getMediaURL(acf.logo_du_site));
      setIcons({
        search: await getMediaURL(acf.icone_recherche),
        adherent: await getMediaURL(acf.icone_adherent),
        eyesOff: await getMediaURL(acf.icon_eys),
      });
      setHeroImg(await getMediaURL(acf.image_header));
    }
    load();
  }, []);
  // useEffect(() => {
  //   const onScroll = () => {
  //     const header = document.querySelector(".sdj-header-container");
  //     if (window.scrollY > 30) header.classList.add("sticky");
  //     else header.classList.remove("sticky");
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <header className="sdj-header">
      <div className="sdj-header-container">

        <Logo logo={logo} />

        <nav className="sdj-menu">
          <div className="sdj-menu-inner">
            <Menu onOpenMega={setMegaMenu} />
          </div>
        </nav>

        <HeaderActions
          iconAdherent={icons.adherent}
          iconSearch={icons.search}
          iconEyesOff={icons.eyesOff}
        />
      </div>

      {megaMenu && (
        <MegaMenu id={megaMenu} onClose={() => setMegaMenu(null)} />
      )}

      <div className="hero">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${heroImg || ""})` }}
        />
        
        <div className="hero-search-box">
          <input type="search" placeholder="Que recherchez-vous ?" />
        </div>
      </div>
    </header>
  );
}

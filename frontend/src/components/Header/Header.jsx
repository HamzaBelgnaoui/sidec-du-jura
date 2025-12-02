import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu.jsx";
import Logo from "./Logo.jsx";
import HeaderActions from "./HeaderActions.jsx";
// import MegaMenu from "../Menu/MegaMenu.jsx";
import { getGlobalSettings, getMediaURL } from "../../api";
import "./Header.css";
 
export default function Header() {
  const [logo, setLogo] = useState(null);
  const [icons, setIcons] = useState({});
  const [heroImg, setHeroImg] = useState(null);
  
  // mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const acf = await getGlobalSettings();
      if (!acf) return;

      setLogo(await getMediaURL(acf.logo_du_site));
      setIcons({
        search: await getMediaURL(acf.icone_recherche),
        adherent: await getMediaURL(acf.icone_adherent),
        eyesOff: await getMediaURL(acf.icon_eys),
        burger:await getMediaURL(acf.icone_burger),
        actualites:await getMediaURL(acf.icone_actualites),
        agenda:await getMediaURL(acf.icone_agenda),
        publication :await getMediaURL(acf.icone_publication),
        lettreInformation :await getMediaURL(acf.icone_lettreinformation),
        presse: await getMediaURL(acf.icone_presse),
        contact: await getMediaURL(acf.icone_contact),
        extranet: await getMediaURL(acf.icone_extranet),
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
            <Menu />
            
          </div>
        </nav>

        <HeaderActions
          iconAdherent={icons.adherent}
          iconSearch={icons.search}
          iconEyesOff={icons.eyesOff}
        />
        {/* MOBILE BURGER */}
        <button
            className="sdj-burger mobile-only"
            onClick={() => setMobileOpen(true)}
          >
            {icons.burger ? (
              <img src={icons.burger} alt="Menu" />
            ) : (
              <div className="burger-fallback">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </button>
      </div>
       {/* MOBILE MENU SLIDE LEFT */}
      <div className={`mobile-menu-wrapper ${mobileOpen ? "show" : ""}`}>
        <div className="mobile-menu">
          {/* <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button> */}

          <Menu mobile={true} />
        </div>

        {/* overlay */}
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        >
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>


      {/* {megaMenu && (
        <MegaMenu id={megaMenu} onClose={() => setMegaMenu(null)} />
      )} */}

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

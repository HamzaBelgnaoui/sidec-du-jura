import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu.jsx";
import Logo from "./Logo.jsx";
import HeaderActions from "./HeaderActions.jsx";
import MegaMenu from "../Menu/MegaMenu.jsx";
import "../Menu/MegaMenu.css"; // <-- import CSS du mega menu

import { getGlobalSettings, getMediaURL } from "../../api";
import "./Header.css";
 
export default function Header() {
  const [logo, setLogo] = useState(null);
  const [icons, setIcons] = useState({});
  const [heroImg, setHeroImg] = useState(null);
  
  // mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  // Mega menu state
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaItem, setMegaItem] = useState(null);

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
  // ouvrir mega menu (passé à Menu via prop onOpenMega)
  const openMega = (item) => {
    setMegaItem(item);
    setMegaOpen(true);
    // close mobile slide if open
    setMobileOpen(false);
  };

  const closeMega = () => {
    setMegaOpen(false);
    setMegaItem(null);
  };

  return (
    // <header className="sdj-header">
    //   <div className="sdj-header-container">

    //     <Logo logo={logo} />

    //     <nav className="sdj-menu">
    //       <div className="sdj-menu-inner">
    //         <Menu />
            
    //       </div>
    //     </nav>

    //     <HeaderActions
    //       iconAdherent={icons.adherent}
    //       iconSearch={icons.search}
    //       iconEyesOff={icons.eyesOff}
    //     />
    //     {/* MOBILE BURGER */}
    //     <button
    //         className="sdj-burger mobile-only"
    //         onClick={() => setMobileOpen(true)}
    //       >
    //         {icons.burger ? (
    //           <img src={icons.burger} alt="Menu" />
    //         ) : (
    //           <div className="burger-fallback">
    //             <span></span>
    //             <span></span>
    //             <span></span>
    //           </div>
    //         )}
    //       </button>
    //   </div>
    //    {/* MOBILE MENU SLIDE LEFT */}
    //   {/* <div className={`mobile-menu-wrapper ${mobileOpen ? "show" : ""}`}> */}
    //     {/* <div className="mobile-menu"> */}
    //       {/* <button
    //         className="mobile-close"
    //         onClick={() => setMobileOpen(false)}
    //       >
    //         ✕
    //       </button> */}

    //       {/* <Menu mobile={true} /> */}
    //     {/* </div> */}

    //     {/* overlay */}
    //     {/* <div
    //       className="mobile-overlay"
    //       onClick={() => setMobileOpen(false)}
    //     >
    //       <button
    //         className="mobile-close"
    //         onClick={() => setMobileOpen(false)}
    //       >
    //         ✕
    //       </button>
    //     </div> */}
    //   {/* </div> */}
    //   {/* MOBILE MENU SLIDE LEFT */}
    //   <div className={`mobile-menu-wrapper ${mobileOpen ? "show" : ""}`}>
    //     <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
    //       <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu">✕</button>

    //       {/* ici le contenu du menu (colonne) */}
    //       <div className="mobile-menu-inner">
    //         <Menu mobile={true} />
    //         {/* droite: icones / liens rapides */}
    //         <div className="mobile-quicklinks">
    //           <button className="adh-btn">ESPACE ADHÉRENT</button>
    //           <ul className="quicklinks-list">
    //             <li><img src={icons.actualites} alt="" aria-hidden/> Actualités</li>
    //             <li><img src={icons.agenda} alt="" aria-hidden/> Agenda</li>
    //             <li><img src={icons.publication} alt="" aria-hidden/> Publications</li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>

    //     {/* overlay */}
    //     <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
    //   </div>



    //   {/* {megaMenu && (
    //     <MegaMenu id={megaMenu} onClose={() => setMegaMenu(null)} />
    //   )} */}

    //   <div className="hero">
    //     <div
    //       className="hero-image"
    //       style={{ backgroundImage: `url(${heroImg || ""})` }}
    //     />
        
    //     <div className="hero-search-box">
    //       <input type="search" placeholder="Que recherchez-vous ?" />
    //     </div>
    //   </div>
    // </header>
     <header className="sdj-header">
      <div className="sdj-header-container">
        <Logo logo={logo} />

        <nav className="sdj-menu">
          <div className="sdj-menu-inner">
            <Menu onOpenMega={openMega} />
          </div>
        </nav>

        <HeaderActions
          iconAdherent={icons.adherent}
          iconSearch={icons.search}
          iconEyesOff={icons.eyesOff}
        />

        <button
          className="sdj-burger mobile-only"
          onClick={() => setMobileOpen(true)}
        >
          {icons.burger ? <img src={icons.burger} alt="Menu" /> : <div className="burger-fallback"><span></span><span></span><span></span></div>}
        </button>
      </div>

      {/* MegaMenu rendu full-screen */}
      {megaOpen && (
        <MegaMenu item={megaItem} onClose={closeMega} icons={icons} />
      )}

      {/* Mobile slide left (existant) */}
      {/* <div className={`mobile-menu-wrapper ${mobileOpen ? "show" : ""}`}>
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu">✕</button>
          <div className="mobile-menu-inner">
            <Menu mobile={true} onOpenMega={openMega} />
            <div className="mobile-quicklinks">
              <button className="adh-btn">ESPACE ADHÉREN</button>
              <ul className="quicklinks-list">
                <li><img src={icons.actualites} alt="" aria-hidden/> Actualités</li>
                <li><img src={icons.agenda} alt="" aria-hidden/> Agenda</li>
                <li><img src={icons.publication} alt="" aria-hidden/> Publications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      </div> */}

      <div className="hero">
        <div className="hero-image" style={{ backgroundImage: `url(${heroImg || ""})` }} />
        <div className="hero-search-box">
          <input type="search" placeholder="Que recherchez-vous ?" />
        </div>
      </div>
    </header>
  );
}

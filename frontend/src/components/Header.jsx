import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { getGlobalSettings, getMediaURL } from "../api";
import "../assets/css/Header.css";

export default function Header() {
    const [logo, setLogo] = useState(null);
    const [iconSearch, setIconSearch] = useState(null);
    const [iconAdherent, setIconAdherent] = useState(null);
    const [iconEyesOff, setIconEyesOff] = useState(null);
    const [heroImg, setHeroImg] = useState(null);

    useEffect(() => {
        async function load() {
            const acf = await getGlobalSettings();

            setLogo(await getMediaURL(acf.logo_du_site));
            setIconSearch(await getMediaURL(acf.icone_recherche));
            setIconAdherent(await getMediaURL(acf.icone_adherent));
            setIconEyesOff(await getMediaURL(acf.icon_eys));
            setHeroImg(await getMediaURL(acf.image_header));
        }
        load();
    }, []);

    return (
        <header className="sdj-header">
            
            {/* CONTAINER TOP */}
            <div className="sdj-header-container">

                {/* LOGO */}
                <div className="sdj-logo">
                    {logo && <img src={logo} alt="SIDEC" />}
                </div>

                {/* MENU */}
                <nav className="sdj-menu">
                    <div className="sdj-menu-inner">
                        <Menu />
                    </div>
                </nav>

                {/* ACTIONS */}
                <div className="sdj-actions">
                    <div className="sdj-adh">
                        {iconAdherent && <img src={iconAdherent} alt="Adhérent" />}
                        <span>ESPACE ADHÉRENT</span>
                    </div>

                    <button className="sdj-action-btn">
                        {iconSearch && <img src={iconSearch} alt="Search" />}
                    </button>

                    <button className="sdj-eyesOff-btn">
                        {iconEyesOff && <img src={iconEyesOff} alt="Accessibility" />}
                    </button>
                </div>
            </div>

            {/* HERO IMAGE + SEARCH */}
            <div className="hero">

                <div
                    className="hero-image"
                    style={{ backgroundImage: `url(${heroImg})` }}
                ></div>

                <div className="hero-search-box">
                    <input type="text" placeholder="Que recherchez-vous ?" />
                </div>
            </div>
        </header>
    );
}

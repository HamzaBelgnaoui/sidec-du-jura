import React from "react";
import "./Logo.css";

export default function Logo({ logo }) {
  return (
    <div className="sdj-logo" aria-label="Logo SIDEC">
      {logo ? (
        <img src={logo} alt="SIDEC du Jura" />
      ) : (
        <div className="sdj-logo-placeholder" />
      )}
    </div>
  );
}

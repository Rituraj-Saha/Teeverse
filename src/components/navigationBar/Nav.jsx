import React from "react";
import styles from "./nav.module.css";
import { ShirtLOGO } from "../../assets/svgAssets";
import SvgStringRenderer from "../../reusableComponent/SvgReusableRenderer";
function Nav() {
  return (
    <nav className={styles.parent}>
      <div
        style={{
          display: "flex",
          border: "1px solid white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "80%",
          padding: "10px",
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: "5px",
          filter: "drop-shadow(0 0 0.75remrgb(64, 57, 55))",
        }}
      >
        <SvgStringRenderer svgString={ShirtLOGO} />
      </div>
      <span
        style={{
          marginLeft: "35px",
          color: "#FFFFFF",
          fontWeight: "800",
        }}
      >
        TEE-VERSE
      </span>
      <div></div>
    </nav>
  );
}

export default Nav;

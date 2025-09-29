import React from "react";
import styles from "./nav.module.css";
import { cartIcon, searchIcon, ShirtLOGO } from "../../assets/svgAssets";
import SvgStringRenderer from "../../reusableComponent/SvgReusableRenderer";
import { Chip, useTheme } from "@mui/material";
import TeesVerseBg from "../../assets/TeesVerseBg.png";
const NAVITEMS = [
  {
    label: "Home",
    onClick: () => {
      console.log("Home Clicked");
    },
  },
  {
    label: "About",
    onClick: () => {
      console.log("Product Clicked");
    },
  },

  {
    label: "Contact Us",
    onClick: () => {
      console.log("Contact Clicked");
    },
  },
];
function Nav() {
  const theme = useTheme();
  console.log(window.location.pathname);
  return (
    <>
      {window.location.pathname !== "/admin" && (
        <nav className={styles.parent}>
          <div className={styles.navBranding}>
            <img
              className={styles.brandingText}
              src={TeesVerseBg}
              height={50}
              width={90}
            ></img>
          </div>

          <div className={styles.optionContainer}>
            <ul className={styles.ulStyle}>
              {NAVITEMS.map((itemm, index) => {
                return (
                  <Chip
                    label={itemm.label}
                    key={index}
                    onClick={itemm.onClick}
                    variant="outlined"
                    sx={{
                      background: theme.palette.custom.dark,
                      color: "#FFF",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    }}
                  ></Chip>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Nav;

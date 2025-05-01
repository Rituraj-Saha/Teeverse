import React from "react";
import styles from "./nav.module.css";
import { cartIcon, searchIcon, ShirtLOGO } from "../../assets/svgAssets";
import SvgStringRenderer from "../../reusableComponent/SvgReusableRenderer";
import { Chip, useTheme } from "@mui/material";
const NAVITEMS = [
  {
    label: "Home",
    onClick: () => {
      console.log("Home Clicked");
    },
  },
  {
    label: "Product",
    onClick: () => {
      console.log("Product Clicked");
    },
  },
  {
    label: "Contact",
    onClick: () => {
      console.log("Contact Clicked");
    },
  },
];
function Nav() {
  const theme = useTheme();
  return (
    <nav className={styles.parent}>
      <div className={styles.navBranding}>
        <div className={styles.logoWrapper}>
          <SvgStringRenderer svgString={ShirtLOGO} />
        </div>
        <span className={styles.brandingText}>TEE-VERSE</span>
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
      <div className={styles.searchCartContainer}>
        <div className={styles.scItem}>
          <SvgStringRenderer svgString={cartIcon} />
          <span>Cart</span>
        </div>
        <div className={styles.scItem}>
          <SvgStringRenderer
            svgString={searchIcon}
            height={"30px"}
            width={"30px"}
          />
          <span>Search</span>
        </div>
        <Chip
          label={"Get Started"}
          onClick={() => {
            console.log("get started clicked");
          }}
          variant="outlined"
          sx={{
            background: theme.palette.secondary.main,
            color: "#FFF",
          }}
        />
      </div>
    </nav>
  );
}

export default Nav;

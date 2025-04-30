import React from "react";
import styles from "./nav.module.css";
import { ShirtLOGO } from "../../assets/svgAssets";
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 0.3,
          border: "1px solid black",
        }}
      >
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
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 0.4,
          border: "1px solid black",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            alignItems: "space-between",
            alignContent: "space-between",
          }}
        >
          {NAVITEMS.map((itemm, index) => {
            return (
              <Chip
                label={itemm.label}
                key={index}
                onClick={itemm.onClick}
                variant="outlined"
                sx={{
                  background: theme.palette.primary.main,
                  color: "#FFF",
                }}
              ></Chip>
            );
          })}
        </ul>
      </div>
      <div></div>
    </nav>
  );
}

export default Nav;

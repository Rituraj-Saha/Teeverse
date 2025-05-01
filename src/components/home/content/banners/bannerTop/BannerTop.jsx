import React from "react";
import styles from "./bannerTop.module.css";
import theme from "../../../../../theme/theme";
import { useTheme } from "@emotion/react";
const BannerTop = () => {
  const theme = useTheme();
  const bannerPointer = [
    {
      msg: "Speak Your Mind in Style",
      svg: "🗣️",
    },
    {
      msg: "Curated & Custom Quotes",
      svg: "📝",
    },
    {
      msg: "High-Quality, Fade-Resistant Prints",
      svg: "🎨",
    },
    {
      msg: "Comfort Meets Attitude",
      svg: "👕",
    },

    {
      msg: "Made to Inspire & Empower",
      svg: "💬",
    },
  ];
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <span
          style={{
            color: "white",
          }}
        >
          Wear your style and follow the trend with{" "}
        </span>
        <span
          style={{
            color: theme.palette.error.main,
            fontWeight: 800,
          }}
        >
          30k+{" "}
        </span>
        <span
          style={{
            color: "white",
          }}
        >
          others
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        {bannerPointer.map((item, idx) => {
          return (
            <div key={idx}>
              <span
                style={{
                  fontSize: "20px",
                }}
              >
                {item.svg}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "white",
                }}
              >
                {item.msg}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerTop;

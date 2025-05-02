import React from "react";
import styles from "./storeWrapper.module.css";
import FilterContainer from "./filterStore/filterContainer";
import StoreContent from "./storeContent/StoreContent";
function StoreWrapper() {
  return (
    <div className={styles.parent}>
      <FilterContainer />
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <StoreContent />
      </div>
    </div>
  );
}

export default StoreWrapper;

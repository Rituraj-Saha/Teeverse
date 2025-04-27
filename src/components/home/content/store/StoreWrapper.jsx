import React from "react";
import styles from "./storeWrapper.module.css";
import FilterContainer from "./filterStore/filterContainer";
import StoreContent from "./storeContent/StoreContent";
function StoreWrapper() {
  return (
    <div className={styles.parent}>
      <FilterContainer />
      <StoreContent />
    </div>
  );
}

export default StoreWrapper;

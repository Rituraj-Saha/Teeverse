import React from "react";
import styles from "./filterContainer.module.css";
const FilterContainer = () => {
  const filterList = {
    Gender: ["Male", "Female"],
    Agegroup: ["Adult", "Childern"],
  };
  return (
    <div className={styles.parent}>
      <span>Filter</span>
      <span>Gender</span>
    </div>
  );
};

export default FilterContainer;

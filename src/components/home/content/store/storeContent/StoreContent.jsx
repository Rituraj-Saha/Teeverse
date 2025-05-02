import React from "react";
import ThumbnailItemView from "../../../../../reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";

function StoreContent() {
  return (
    <div>
      <ThumbnailItemView
        id={1}
        name={"Witty Tee"}
        gender={"Both"}
        ageGroup={"Adult"}
        price={525}
        discount={20}
        maxStock={10}
        sizeAvailabilibity={["S", "M", "L", "XL", "XXL"]}
      />
    </div>
  );
}

export default StoreContent;

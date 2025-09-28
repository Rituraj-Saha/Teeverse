import React from "react";
import ThumbnailItemView from "../../../../../reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
import { FEATUREDPRODUCT } from "../../../../../assets/payload/FEATURED-PRODUCT";
import { ClipLoader } from "react-spinners";
import useIsMobile from "../../../../../customhook/useIsMobile";
function StoreContent(props) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const numColumns = useIsMobile() ? 1 : 3;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://getproducts-chwarfmcvq-uc.a.run.app"
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("data: ", data);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        gap: "15px",
        width: "100%",
      }}
    >
      {loading ? (
        <ClipLoader color="#36d7b7" loading={loading} size={150} />
      ) : (
        data.map((item, idx) => {
          return (
            <ThumbnailItemView
              key={idx}
              id={item.id}
              name={item.productName}
              gender={item.gender}
              ageGroup={item.ageGroup}
              price={item.price}
              discount={item.discount}
              maxStock={item.maxStock}
              sizeAvailabilibity={item.availableSize}
              thumbnail={item.thumbnail}
            />
          );
        })
      )}
    </div>
  );
}

export default StoreContent;

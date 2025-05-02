import React from "react";

const SizeSelector = (props) => {
  const { availableSize } = props;
  const options = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = React.useState("M");
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {options.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flex: "1",
              border: "1px solid black",
              gap: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "40%",
                border: "1px solid black",
                padding: "2px",
              }}
            >
              <div
                style={
                  selectedSize === item
                    ? {
                        background: "green",
                        display: "flex",
                        height: "100%",
                        width: "100%",
                      }
                    : { display: "none" }
                }
              ></div>
            </div>
            <span style={{ fontSize: "10px" }}>{item}</span>
          </div>
        );
      })}
    </div>
  );
};
const ThumbnailItemView = (props) => {
  const {
    id,
    name,
    gender,
    ageGroup,
    price,
    discount,
    maxStock,
    sizeAvailabilibity,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        width: "20vw",
        height: "50vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flex: "0.7",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flex: "0.3",
          flexDirection: "column",
        }}
      >
        <span>{name}</span>
        <div
          style={{
            display: "flex",
            flex: ".1",
          }}
        >
          <div>
            <span>Gender:</span>
            <span>{gender}</span>
          </div>
          <div>
            <span>Age:</span>
            <span>{ageGroup}</span>
          </div>
        </div>
        <SizeSelector availableSize={sizeAvailabilibity} />
      </div>
    </div>
  );
};

export default ThumbnailItemView;

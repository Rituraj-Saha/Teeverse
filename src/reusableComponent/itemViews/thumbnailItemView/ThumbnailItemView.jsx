import React, { useState } from "react";
import _ from "lodash";
import { useTheme } from "@emotion/react";
import styles from "./thumbnailItemView.module.css";
import samplebgremove from "../../../assets/samplebgremove.png";
import SvgStringRenderer from "../../SvgReusableRenderer";
import { cartIconItem } from "../../../assets/svgAssets";
import { Chip } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

function OrderDialog({ open, handleClose }) {
  const [order, setOrder] = useState({
    productId: "BzmUhiP6Ku8c1774IwPs",
    qty: 1,
    size: "M",
    deliveryAddress: {
      line: "",
      pincode: "",
      district: "",
      state: "",
      nation: "IN",
      landmark: "",
      receiverphone_number: "",
    },
    uname: "",
    uphoneNumber: "",
    user_email: "",
  });

  const [errors, setErrors] = useState({});

  // Handle change for top-level fields
  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Handle change for nested deliveryAddress fields
  const handleAddressChange = (e) => {
    setOrder({
      ...order,
      deliveryAddress: {
        ...order.deliveryAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  // ✅ Validation function
  const validate = () => {
    let tempErrors = {};

    if (!order.uname.trim()) tempErrors.uname = "Name is required";
    if (!order.uphoneNumber.match(/^\+91\d{10}$/))
      tempErrors.uphoneNumber = "Phone must be in +91XXXXXXXXXX format";
    if (!/\S+@\S+\.\S+/.test(order.user_email))
      tempErrors.user_email = "Valid email is required";

    if (!order.deliveryAddress.line.trim())
      tempErrors.line = "Address line is required";
    if (!order.deliveryAddress.pincode.match(/^\d{6}$/))
      tempErrors.pincode = "Valid 6-digit pincode required";
    if (!order.deliveryAddress.district.trim())
      tempErrors.district = "District is required";
    if (!order.deliveryAddress.state.trim())
      tempErrors.state = "State is required";
    if (!order.deliveryAddress.receiverphone_number.match(/^\+91\d{10}$/))
      tempErrors.receiverphone_number =
        "Receiver phone must be in +91XXXXXXXXXX format";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validate()) return;

  //   try {
  //     const response = await fetch(
  //       "https://recordorder-chwarfmcvq-uc.a.run.app",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key": "FCA713E949D4232E6CF2A26CED33B",
  //         },
  //         body: JSON.stringify(order),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to place order");
  //     }

  //     const result = await response.json();
  //     console.log("Order Success:", result);
  //     alert("Order placed successfully!");
  //     handleClose();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error placing order");
  //   }
  // };
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Step 1: Send to API
      const response = await fetch(
        "https://recordorder-chwarfmcvq-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "FCA713E949D4232E6CF2A26CED33B",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const result = await response.json();
      console.log("Order Success:", result);

      // Step 2: Build WhatsApp message
      const message = `
I want to order:

👤 Name: ${order.uname}
📞 Phone: ${order.uphoneNumber}
📧 Email: ${order.user_email}

📦 Product ID: ${order.productId}
🔢 Qty: ${order.qty}
📏 Size: ${order.size}

🏠 Delivery Address:
${order.deliveryAddress.line}, 
${order.deliveryAddress.district}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}
Landmark: ${order.deliveryAddress.landmark}
Receiver Phone: ${order.deliveryAddress.receiverphone_number}
Nation: ${order.deliveryAddress.nation}
    `;

      const whatsappNumber = "917980068048"; // without "+" prefix
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      alert("Order placed successfully!");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Place Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="uname"
              fullWidth
              value={order.uname}
              onChange={handleChange}
              error={!!errors.uname}
              helperText={errors.uname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone (+91XXXXXXXXXX)"
              name="uphoneNumber"
              fullWidth
              value={order.uphoneNumber}
              onChange={handleChange}
              error={!!errors.uphoneNumber}
              helperText={errors.uphoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="user_email"
              fullWidth
              value={order.user_email}
              onChange={handleChange}
              error={!!errors.user_email}
              helperText={errors.user_email}
            />
          </Grid>

          {/* Delivery Address */}
          <Grid item xs={12}>
            <TextField
              label="Address Line"
              name="line"
              fullWidth
              value={order.deliveryAddress.line}
              onChange={handleAddressChange}
              error={!!errors.line}
              helperText={errors.line}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Pincode"
              name="pincode"
              fullWidth
              value={order.deliveryAddress.pincode}
              onChange={handleAddressChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="District"
              name="district"
              fullWidth
              value={order.deliveryAddress.district}
              onChange={handleAddressChange}
              error={!!errors.district}
              helperText={errors.district}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              name="state"
              fullWidth
              value={order.deliveryAddress.state}
              onChange={handleAddressChange}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Landmark"
              name="landmark"
              fullWidth
              value={order.deliveryAddress.landmark}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Receiver Phone (+91XXXXXXXXXX)"
              name="receiverphone_number"
              fullWidth
              value={order.deliveryAddress.receiverphone_number}
              onChange={handleAddressChange}
              error={!!errors.receiverphone_number}
              helperText={errors.receiverphone_number}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const SizeSelector = (props) => {
  const { availableSize } = props;
  const options = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = React.useState("M");
  const theme = useTheme();
  const handleChange = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className={styles.sizeSelectorParent}>
      {options.map((item, index) => {
        const isAvailable = _.includes(availableSize, item);
        const isSelected = selectedSize === item;

        return (
          <div
            key={index}
            className={styles.sizeSelectorItemParent}
            style={{
              cursor: isAvailable ? "pointer" : "not-allowed",
              opacity: isAvailable ? 1 : 0.4,
            }}
            onClick={() => {
              if (isAvailable) handleChange(item);
            }}
          >
            <div
              className={styles.sizeSelectorBoxParent}
              style={{
                border: `1.8px solid ${
                  isAvailable ? "black" : theme.palette.disable.main
                }`,
              }}
            >
              {isSelected && <div className={styles.sizeSelectorseletedBox} />}
            </div>
            <span style={{ fontSize: "13px" }}>{item}</span>
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
    thumbnail,
  } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.parentTumbnail}>
      <div className={styles.imageContainer}>
        {console.log("thumbnail: ", thumbnail)}
        <img src={thumbnail} height={"100%"} width={"100%"} />
      </div>
      <div className={styles.infoContainerS}>
        <div className={styles.nameContainer}>
          <span className={styles.productName}>{name}</span>
          <Chip
            label={"Buy Now"}
            onClick={() => setOpen(true)}
            variant="outlined"
            sx={{
              background: theme.palette.custom.lightSecondary,
              color: "#FFF",
              paddingLeft: "5px",
              paddingRight: "5px",
              "&:hover": {
                color: "#000", // Hover font color
                backgroundColor: "#f0f0f0", // optional
              },
            }}
          ></Chip>
        </div>
        {/* <div className={styles.gaContainer}>
          <div>
            <span className={styles.productName}>Gender:</span>
            <span className={styles.nameValue}>{gender}</span>
          </div>
          <div>
            <span className={styles.productName}>Age:</span>
            <span className={styles.nameValue}>{ageGroup}</span>
          </div>
        </div> */}
        <SizeSelector availableSize={sizeAvailabilibity} />
        <div className={styles.priceContainer}>
          <span className={styles.productName}>INR: </span>
          <span
            className={styles.nameValue}
            style={{
              textDecoration: "line-through",
            }}
          >
            {`₹${price}`}
          </span>
          <span
            className={styles.nameValue}
            style={{
              color: "green",
            }}
          >{`${discount}%off`}</span>
          <span
            className={styles.nameValue}
            style={{
              color: "green",
            }}
          >
            {`₹${price - (price * discount) / 100}`}
          </span>
          {/* <div className={styles.cartWrapper}>
            <SvgStringRenderer svgString={cartIconItem} />
          </div> */}
        </div>
      </div>
      <OrderDialog open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default ThumbnailItemView;

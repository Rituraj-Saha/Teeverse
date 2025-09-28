import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const API_BASE = "https://your-cloud-function-url"; // replace with your Firebase Functions base URL

export default function ProductAdminPanel() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    discount: "",
    maxorderCount: "",
    availableSize: [],
    thumbnail: null,
    images: [],
  });

  const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`https://getproducts-chwarfmcvq-uc.a.run.app`);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        productName: product.productName || "",
        price: product.price || "",
        discount: product.discount || "",
        maxorderCount: product.maxorderCount || "",
        availableSize: product.availableSize || [],
        thumbnail: null,
        images: [],
      });
    } else {
      setFormData({
        productName: "",
        price: "",
        discount: "",
        maxorderCount: "",
        availableSize: [],
        thumbnail: null,
        images: [],
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "thumbnail")
        setFormData({ ...formData, thumbnail: files[0] });
      if (name === "images") setFormData({ ...formData, images: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSizeChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, availableSize: value });
  };

  const handleSubmit = async () => {
    try {
      let productId = editingProduct?.id;
      if (!editingProduct) {
        // Create Product
        const { data } = await axios.post(`https://createproduct-chwarfmcvq-uc.a.run.app`, {
          productName: formData.productName,
          price: parseFloat(formData.price),
          discount: parseFloat(formData.discount),
          maxorderCount: parseInt(formData.maxorderCount),
          availableSize: formData.availableSize,
        });
        productId = data.id;
      } else {
        // Update Product
        await axios.put(`${API_BASE}/updateProduct`, {
          id: productId,
          productName: formData.productName,
          price: parseFloat(formData.price),
          discount: parseFloat(formData.discount),
          maxorderCount: parseInt(formData.maxorderCount),
          availableSize: formData.availableSize,
        });
      }

      // Upload images if any
      if (formData.thumbnail || formData.images.length > 0) {
        const fileData = new FormData();
        if (formData.thumbnail)
          fileData.append("thumbnail", formData.thumbnail);
        formData.images.forEach((img) => fileData.append("images", img));
        await axios.post(
          `${API_BASE}/uploadProductFiles?productId=${productId}`,
          fileData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      fetchProducts();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`${API_BASE}/deleteProduct`, { data: { id } });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "productName", header: "Product Name" },
    { accessorKey: "price", header: "Price (₹)" },
    {
      accessorKey: "availableSize",
      header: "Available Sizes",
      Cell: ({ cell }) => cell.getValue().join(", "),
    },
    { accessorKey: "discount", header: "Discount (%)" },
    {
      accessorKey: "discountAvailable",
      header: "Discount Available",
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    },
    { accessorKey: "maxorderCount", header: "Max Order Count" },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      Cell: ({ cell }) =>
        cell.getValue()?.[0] ? (
          <img
            src={cell.getValue()[0]}
            alt="thumbnail"
            style={{ width: 50, height: 50, borderRadius: 4 }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      header: "Actions",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleOpenModal(row.original)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDelete(row.original.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpenModal()}
      >
        Add Product
      </Button>
      <MaterialReactTable
        columns={columns}
        data={products}
        enablePagination
        enableRowActions
      />

      {/* Modal for Add/Edit */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Discount"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Max Order Count"
            name="maxorderCount"
            type="number"
            value={formData.maxorderCount}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Available Sizes"
            multiple
            value={formData.availableSize}
            onChange={handleSizeChange}
            fullWidth
          >
            {SIZE_OPTIONS.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
          <input type="file" name="thumbnail" onChange={handleChange} />
          <input type="file" name="images" multiple onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingProduct ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

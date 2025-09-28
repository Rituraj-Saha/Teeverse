// ------------------------
// Firebase Admin + Functions
// ------------------------
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import multer from "multer";
import { promisify } from "util";

// ------------------------
// Initialize Firebase Admin
// ------------------------
initializeApp();
const db = getFirestore();
const storage = getStorage();
const apiKeyParam = defineString("API_KEY");

// ------------------------
// Multer setup (promisified)
// ------------------------
const upload = multer({ storage: multer.memoryStorage() });
const uploadFiles = promisify(
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ])
);

// ------------------------
// CORS middleware
// ------------------------
const corsHandler = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, X-Api-Key");
  if (req.method === "OPTIONS") return res.status(204).send("");
  next();
};

// ------------------------
// CREATE Product
// ------------------------
export const createProduct = onRequest(
  { timeoutSeconds: 540 },
  async (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "POST")
        return res.status(405).send("Method Not Allowed");

      try {
        const { productName, price, discount, maxorderCount, availableSize } =
          req.body;

        const newRef = db.collection("products").doc();
        await newRef.set({
          productName,
          price,
          discount,
          maxorderCount,
          availableSize,
          discountAvailable: discount > 0,
          images: [],
          thumbnail: "",
          createdAt: FieldValue.serverTimestamp(),
        });

        res.status(201).json({ id: newRef.id, message: "Product created" });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

// ------------------------
// UPDATE Product
// ------------------------
export const updateProduct = onRequest(
  { timeoutSeconds: 120 },
  async (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "PUT")
        return res.status(405).send("Method Not Allowed");

      try {
        const { id, ...updates } = req.body;
        if (!id) return res.status(400).send("Product ID required");

        await db
          .collection("products")
          .doc(id)
          .update({
            ...updates,
            updatedAt: FieldValue.serverTimestamp(),
          });

        res.status(200).json({ message: "Product updated" });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

// ------------------------
// DELETE Product
// ------------------------
export const deleteProduct = onRequest(
  { timeoutSeconds: 120 },
  async (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "DELETE")
        return res.status(405).send("Method Not Allowed");

      try {
        const { id } = req.body;
        if (!id) return res.status(400).send("Product ID required");

        await db.collection("products").doc(id).delete();
        res.status(200).json({ message: "Product deleted" });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

// ------------------------
// UPLOAD Product Files
// ------------------------
export const uploadProductFiles = onRequest(
  { timeoutSeconds: 180 },
  async (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "POST")
        return res.status(405).send("Method Not Allowed");

      const productId = req.query.productId;
      if (!productId) return res.status(400).send("Product ID required");

      try {
        await uploadFiles(req, res);

        const bucket = storage.bucket();
        const updates = {};

        if (req.files["thumbnail"]?.length) {
          const file = req.files["thumbnail"][0];
          const filePath = `${productId}/thumbnail/${file.originalname}`;
          const blob = bucket.file(filePath);
          await blob.save(file.buffer, { contentType: file.mimetype });
          updates.thumbnail = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        }

        if (req.files["images"]?.length) {
          updates.images = [];
          for (const file of req.files["images"]) {
            const filePath = `${productId}/images/${file.originalname}`;
            const blob = bucket.file(filePath);
            await blob.save(file.buffer, { contentType: file.mimetype });
            updates.images.push(
              `https://storage.googleapis.com/${bucket.name}/${filePath}`
            );
          }
        }

        await db.collection("products").doc(productId).update(updates);
        res.status(200).json({ message: "Files uploaded", updates });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

// ------------------------
// GET Products
// ------------------------
export const getProducts = onRequest(
  { timeoutSeconds: 120 },
  async (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "GET")
        return res.status(405).send("Method Not Allowed");

      try {
        const snapshot = await db.collection("products").get();
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.status(200).json(productsList);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

// ------------------------
// RECORD ORDER
// ------------------------
export const recordOrder = onRequest(
  { timeoutSeconds: 120 },
  async (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "POST")
        return res.status(405).send("Method Not Allowed");

      if (req.headers["x-api-key"] !== apiKeyParam.value()) {
        return res.status(403).send("Unauthorized");
      }

      try {
        const {
          productId,
          qty,
          size,
          deliveryAddress,
          uname,
          uphoneNumber,
          user_email,
        } = req.body;

        if (
          !productId ||
          !qty ||
          !size ||
          !deliveryAddress ||
          !uname ||
          !uphoneNumber
        ) {
          return res.status(400).send("Missing required order details.");
        }

        const newOrderRef = db.collection("orders").doc();
        const oid = newOrderRef.id;

        await newOrderRef.set({
          oid,
          productId,
          qty,
          size,
          deliveryAddress,
          uname,
          uphoneNumber,
          user_email: user_email || null,
          status: "pending_whatsapp_confirmation",
          createdAt: FieldValue.serverTimestamp(),
        });

        res.status(200).json({ message: "Order recorded successfully!", oid });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

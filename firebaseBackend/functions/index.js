// Import the necessary modules using ES Modules syntax
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
// Initialize the Admin SDK once at the top
initializeApp();
const db = getFirestore();

const apiKeyParam = defineString("API_KEY");
// CORS handling function
const corsHandler = (req, res, callback) => {
  res.set("Access-Control-Allow-Origin", "*"); // Or replace * with your domain, e.g., 'https://yourwebsite.com'
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, X-Api-Key");

  if (req.method === "OPTIONS") {
    // Pre-flight request. Send a 204 status code with headers.
    res.status(204).send("");
    return;
  }
  callback();
};

// Export the getProducts function
export const getProducts = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const productsCollection = db.collection("products");
      const snapshot = await productsCollection.get();
      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

// Export the recordOrder function
export const recordOrder = onRequest(async (req, res) => {
  // Validate request method and security key
  if (
    req.method !== "POST" ||
    req.headers["x-api-key"] !== apiKeyParam.value()
  ) {
    return res.status(403).send("Unauthorized");
  }

  try {
    // Destructure all the required data from the request body
    const {
      productId,
      qty,
      size,
      deliveryAddress,
      uname,
      uphoneNumber,
      user_email,
    } = req.body;

    // Validate the core required fields
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

    const ordersCollection = db.collection("orders");

    // Use Firestore's auto-ID for the order ID (oid)
    const newOrderRef = ordersCollection.doc();
    const oid = newOrderRef.id;

    const orderData = {
      oid,
      productId,
      qty,
      size,
      deliveryAddress,
      uname,
      uphoneNumber,
      user_email: user_email || null, // Optional field
      status: "pending_whatsapp_confirmation",
      createdAt: FieldValue.serverTimestamp(),
    };

    // Add the new order document to the collection
    await newOrderRef.set(orderData);

    // You can send back the auto-generated ID to the frontend if needed
    return res.status(200).json({
      message: "Order recorded successfully!",
      oid,
    });
  } catch (error) {
    console.error("Error recording order:", error);
    return res.status(500).send("Internal Server Error");
  }
});

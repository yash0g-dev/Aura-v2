# A U R A // Premium E-Commerce Ecosystem

Aura is a high-end, production-ready full-stack e-commerce experience tailored for premium technical performance gear. Built with a stark, industrial minimalist design language inspired by luxury editorial frameworks (Zara, Nike Lab), the ecosystem features asynchronous layout scaling, real-time query parameter synchronization, and cryptographic payment fulfillment pipelines.

### Core Technology Vectors

<p align="left">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
  <a href="https://www.framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer" /></a>
  <a href="https://zustand-demo.pmnd.rs"><img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge" /></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /></a>
  <a href="https://www.mongodb.com"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /></a>
  <a href="https://cloudinary.com"><img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" /></a>
  <a href="https://razorpay.com"><img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay" /></a>
</p>

---

## 📦 Repository Structure

This project is split into separate frontend and backend repositories.

| Repository | Description |
| :--- | :--- |
| **Frontend (Current Repository)** | Next.js 15 storefront, admin dashboard, UI/UX, checkout flow, and client-side features. |
| **[Backend API](https://github.com/yash0g-dev/Aura-Ecom/tree/main/backend)** | Express.js REST API, authentication, MongoDB, Cloudinary, Razorpay integration, and admin services. |

> [!NOTE]  
> **Core Backend Inheritance:** The backend service powering this node ecosystem is inherited and refactored directly from the verified stable release of [Aura Backend v1 Core Architecture](https://github.com/yash0g-dev/Aura-Ecom/tree/main/backend).

## ⚡ Key Features

- **Modern Storefront Experience:** Premium, responsive UI with smooth animations, intuitive navigation, and a minimalist shopping experience optimized for desktop and mobile.

- **Dynamic Product Catalog:** Browse products with real-time filtering, sorting, and category refinement. Filter selections are synchronized with URL query parameters, making searches shareable and persistent across refreshes.

- **SEO-Friendly Product Pages:** Each product is accessible through clean, slug-based URLs, enabling better discoverability and a more intuitive browsing experience.

- **Secure Authentication:** Cookie-based authentication with protected admin routes and secure session management.

- **Razorpay Payment Integration:** End-to-end checkout flow powered by Razorpay with secure payment verification and order processing.

- **Administrative Dashboard:** Dedicated admin portal for managing the product catalog, inventory, orders, and store operations from a centralized interface.

- **Analytics & Telemetry:** Live dashboard displaying key business metrics, including revenue, orders, product performance, and overall store activity.

- **Cloud Media Management:** Product images are uploaded directly to Cloudinary for fast, reliable, and scalable media delivery.


<p align="center">
  <img src="./assets/home.png" width="100%">
</p>

## 📸 Interface Showcase

### Client Discovery Catalog Shell

<p align="center">
  <img src="./assets/catalog.png" width="900">
    <img src="./assets/productnbag.png" width="900">
    <img src="./assets/women.png" width="900">
    <img src="./assets/checkout.png" width="900">
</p>

---

## 🛠️ Architecture Matrix





### Tech Stack Details

| Layer | Technology | Primary Utility Function |
| :--- | :--- | :--- |
| **Frontend Frame** | `Next.js 15+ (App Router)` | Server-first layout generation, unified file-system routing. |
| **Style Canvas** | `Tailwind CSS` | Utility-first stark layout layouts, fluid layouts. |
| **Kinetic Layer** | `Framer Motion` | Hardware-accelerated width squeezing and full-bleed transitions. |
| **State Repository** | `Zustand` | Persistent lightweight memory array caching for asynchronous bag/cart tracking. |
| **Backend Engine** | `Node.js` / `Express` | Micro-route controllers, secure JSON Web Token authorization lines. |
| **Database Pool** | `MongoDB` / `Mongoose` | Rigid aggregation modeling and nested verification sub-documents. |
| **Media Delivery** | `Multer` / `Cloudinary` | Direct multi-part buffer asset streaming bypassing local disk layers. |
| **Payment Gateway**| `Razorpay SDK` | Cryptographic merchant handshake signatures and validation sandboxes. |

---

## 🎛️ Administrative Workspace Operations Guide

The ecosystem includes a secure, abstracted control vector for store managers to override inventory levels, parse financial velocity, and handle active product catalog drops. 

### 🔐 Root Verification Credentials
To access the administrative dashboard, pass the hardcoded root parameters through the secure authentication form:

* **Access Identity:** `admin@gmail.com`
* **Access Password:** `123456`

---

### 🕹️ Operational Walkthrough

#### Step 1: Accessing the Gateway Node
Navigate to the root authentication layout (`/login` ). Enter the verification credentials into the minimalist entry frame.

<p align="center">
  <img src="./assets/adminlogin.png" width="900">
   <img src="./assets/admindashboard.png" width="900">
</p>

---

#### Step 2: Telemetry Overview & Financial Tracking
Upon clean token signature verification, the node transitions to the telemetry board. Here you can monitor systemic gross merchandise value (GMV), capture totals, and transaction frequency logs.

<p align="center">
  <img src="./assets/telemetry.png" width="900">
</p>


#### Step 3: Product Catalog Aggregation & Uploads
To append a new dropset item, navigate to the catalog manipulation sector. Use the native drag-and-drop boundary box to parse asset attachments straight to Cloudinary pipelines. Set strict string arrays for categories and tracking numbers.

<p align="center">
  <img src="./assets/admincreateprod.png" width="900">
</p>


---

## 📋 System Configuration Variables

Create these localized profile documents inside the respective root directories to bind service nodes cleanly.

### Frontend Credentials (`/frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5050
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YourPublicKeyHere

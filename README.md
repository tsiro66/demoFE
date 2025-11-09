# E-Commerce Demo Frontend (React + Vite)

This project is the complete frontend for a single-product e-commerce demo site. It is built with React, Vite, and Tailwind CSS, focusing on a clean, modern, multi-page user funnel.

It features a product landing page, a persistent shopping cart, a distraction-free checkout flow, and full-stack marketing event tracking.

---

## Tech Stack

* **React 18 (with Hooks)**
* **Vite**: For fast, modern development and bundling.
* **TypeScript**: For type safety across the application.
* **Tailwind CSS**: For all styling.
* **React Router (v6)**: For client-side routing.
* **Framer Motion**: For all page transitions and micro-interactions.
* **Axios**: For communicating with the backend API.
* **React Icons**: For UI icons.

---

## Core Features

* **4-Page Funnel**: A logical user flow from Landing → Cart → Checkout → Confirmation.
* **Persistent Cart**: Cart quantity is saved in `localStorage`, allowing users to refresh the page without losing their order.
* **Full-Stack Event Tracking**: Implements a `useTracking` hook that sends key marketing events (`page_view`, `add_to_cart`, `begin_checkout`) to a backend analytics endpoint.
* **Central State Management**: Uses React Context (`CartContext`) to manage product data, cart state, and loading/error states across the entire app.
* **Animated Transitions**: All page transitions are animated using Framer Motion for a smooth, professional feel.
* **Responsive Design**: Fully responsive layout built with Tailwind CSS.

---

## 1. Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (v18 or higher) and **npm**
2. The **E-Commerce Backend** project must be running (by default on [http://localhost:8080](http://localhost:8080)).

---

## 2. Setup & Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/tsiro66/demoFE.git
cd demoFE
```

### Step 2: Install Dependencies

This will install React, Tailwind, Axios, Framer Motion, and all other required packages.

```bash
npm install
```

---

## 3. Running the Application

### Step 1: Start the Backend Server

Ensure your Spring Boot backend is running on [http://localhost:8080](http://localhost:8080) (or whichever port you configured).  
The frontend cannot function without it.

### Step 2: Start the Frontend Dev Server

```bash
npm run dev
```

This will start the Vite development server, typically on [http://localhost:5173](http://localhost:5173).

Open this URL in your browser to see the live application.  
The app will automatically connect to your backend, fetch the product, and enable the full shopping funnel.

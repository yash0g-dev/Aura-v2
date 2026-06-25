import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import "@/app/globals.css";

export const metadata = {
  title: "Aura | Premium Sportswear Matrix",
  description: "Engineered athletic gear built for peak human performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-white antialiased min-h-screen relative selection:bg-white selection:text-black">
        {/* 1. Global Notification Context Provider Container */}
        <Toaster
          position="top-right"
          toastOptions={{
            // Give it a sleek, dark Zara/Gymshark aesthetic matching our black canvas
            style: {
              background: "#0a0a0a",
              color: "#fff",
              border: "1px solid #171717",
              borderRadius: "0px", // Rigid premium borders
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            },
          }}
        />

        {/* 2. Persistent Client Interface Layout and Hydration Elements */}
        <AuthProvider>
          {/* Main Navigation Header */}
          <Navbar />

          {/* Global Slide-out Drawer Component */}
          <CartDrawer />

          {/* Render Active Folder Pages Content */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

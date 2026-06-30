"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import axiosInstance from "@/lib/axios";
import { CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const cart = useCartStore((state) => state.cart);
  const subtotal = useCartStore((state) => state.getCartSubtotal());

  // Calculate pricing metrics
  const shipping = subtotal > 150 ? 0 : 15;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + estimatedTax;

  const [processing, setProcessing] = useState(false);

  // 1. Synchronized Form State Matrix containing 'state' parameter hook
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your shopping bag is empty");
      return;
    }

    try {
      setProcessing(true);

      // 2. Transformed OrderPayload structured precisely as a 1:1 match for your Mongoose sub-schema
      const orderPayload = {
        products: cart.map((item) => ({
          _id: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          firstName: shippingForm.firstName,
          lastName: shippingForm.lastName,
          addressLine1: shippingForm.address,
          addressLine2: "",
          city: shippingForm.city,
          state: shippingForm.state,
          postalCode: shippingForm.postalCode,
          phone: shippingForm.phone,
        },
        couponCode: null,
      };

      const { data } = await axiosInstance.post(
        "/api/payments/create-order",
        orderPayload,
      );

      // 3. Configure Razorpay Gateway Options
      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Snk2n1Y872bwmJ",
        amount: data.order.amount,
        currency: data.order.currency || "INR",
        name: "Aura",
        description: "Premium Performance Gear Synchronization",
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            const verificationPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            await axiosInstance.post(
              "/api/payments/verify-payment",
              verificationPayload,
            );

            toast.success("Payment Captured Successfully!");
            clearCart();
            router.push("/");
          } catch (verificationError) {
            toast.error(
              "Cryptographic signature verification exception caught.",
            );
          }
        },
        prefill: {
          name: `${shippingForm.firstName} ${shippingForm.lastName}`,
          contact: shippingForm.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Checkout execution phase exception:", err);
      toast.error(
        err.response?.data?.message || "Order initialization failed.",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* LEFT COLUMN: Shipping Form Area */}
        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:col-span-7 space-y-8"
        >
          <div>
            <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">
              Secure Gateway Node
            </span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-1">
              Shipping & Checkout
            </h1>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Truck className="h-4 w-4 text-white" /> Delivery Logistics
              Vectors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="First Name"
                name="firstName"
                value={shippingForm.firstName}
                onChange={handleInputChange}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                name="lastName"
                value={shippingForm.lastName}
                onChange={handleInputChange}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            <input
              type="text"
              required
              placeholder="Street Address"
              name="address"
              value={shippingForm.address}
              onChange={handleInputChange}
              className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />

            {/* Expanded responsive layout accommodating City, State, and Postal inputs flawlessly */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="City"
                name="city"
                value={shippingForm.city}
                onChange={handleInputChange}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              />
              <input
                type="text"
                required
                placeholder="State"
                name="state"
                value={shippingForm.state}
                onChange={handleInputChange}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              />
              <input
                type="text"
                required
                placeholder="Postal Code"
                name="postalCode"
                value={shippingForm.postalCode}
                onChange={handleInputChange}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            <input
              type="tel"
              required
              placeholder="Contact Phone Number"
              name="phone"
              value={shippingForm.phone}
              onChange={handleInputChange}
              className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={processing || cart.length === 0}
            className="w-full bg-white text-black py-5 text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed border border-transparent disabled:border-neutral-850"
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Initialize Secure Payment <CreditCard className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* RIGHT COLUMN: Order Summary Dashboard */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 p-6 lg:sticky lg:top-28">
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-6 pb-2 border-b border-neutral-900">
            Order Inventory Summary ({cart.length})
          </h2>

          <div className="max-h-64 overflow-y-auto divide-y divide-neutral-900 pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="relative w-12 aspect-[3/4] bg-neutral-900 shrink-0 border border-neutral-900">
                  <Image
                    src={item.product.images?.[0] || "/placeholder.jpg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-black uppercase truncate text-neutral-200">
                    {item.product.name}
                  </h4>
                  <p className="text-neutral-500 mt-0.5">
                    Size: {item.selectedSize} // Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-black">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-900 mt-6 pt-6 space-y-3 text-xs">
            <div className="flex justify-between text-neutral-400 font-medium">
              <span>Subtotal</span>
              <span className="text-white font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-400 font-medium">
              <span>Estimated Shipping</span>
              <span className="text-white font-bold">
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-neutral-400 font-medium">
              <span>Tax Valuation (8%)</span>
              <span className="text-white font-bold">
                ${estimatedTax.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-neutral-900 pt-4 flex justify-between items-baseline">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-300">
                Total Valuation Matrix
              </span>
              <span className="text-xl font-black text-white">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-neutral-900/40 border border-neutral-900/60 flex gap-3 items-center">
            <ShieldCheck className="h-5 w-5 text-neutral-400 shrink-0" />
            <p className="text-[10px] text-neutral-500 font-medium leading-normal">
              Transaction channel fully encrypted via secure socket layer
              layers. Compliance parameters verified.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

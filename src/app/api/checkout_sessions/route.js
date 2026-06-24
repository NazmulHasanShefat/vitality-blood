import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getUserSession } from "@/lib/api/user";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
     const formData = await request.formData();
    const pricingAmount = formData.get("amount");
    const user = await getUserSession();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
     customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          // price:  'price_1TlakGH3MWkBoN0SgDuMlOot',
          price_data: {
            currency: "bdt", // অথবা 'usd'
            unit_amount: Number(pricingAmount) * 100, // Stripe সবসময় পয়সায় নেয় — ৳500 = 50000
            product_data: {
              name: "Blood Donation Payment", // Checkout page এ দেখাবে
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

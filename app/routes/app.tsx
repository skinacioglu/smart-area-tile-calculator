import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 1. authenticate içinden session, billing ve redirect'i çekiyoruz
  const { session, billing, redirect } = await authenticate.admin(request);

  // 2. Fatura var mı diye sadece "okuma" yapıyoruz (fatura oluşturmuyoruz)
  const { hasActivePayment } = await billing.check();

  // 3. Fatura yoksa, senin bulduğun dinamik linki üretip oraya fırlatıyoruz
  if (!hasActivePayment) {
    const storeHandle = session.shop.replace('.myshopify.com', '');
    const pricingUrl = `https://admin.shopify.com/store/${storeHandle}/charges/smart-area-tile-calculator/pricing_plans`;
    
    return redirect(pricingUrl, { target: "_top" });
  }

  // Fatura varsa içeri al
  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        <s-link href="/app">Overview</s-link>
        <s-link href="/app/advanced-setup-guide">Advanced Setup Guide</s-link>
        <s-link href="/app/additional">Support & Contact</s-link>
      </s-app-nav>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
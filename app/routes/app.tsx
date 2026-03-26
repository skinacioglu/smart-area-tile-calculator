import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, billing } = await authenticate.admin(request);

  const { hasActivePayment } = await billing.check();

  if (!hasActivePayment) {
    const storeHandle = session.shop.replace(".myshopify.com", "");
    const pricingUrl = `https://admin.shopify.com/store/${storeHandle}/charges/smart-area-tile-calculator/pricing_plans`;

    return { redirectTo: pricingUrl, apiKey: "" };
  }

  return {
    redirectTo: null,
    // eslint-disable-next-line no-undef
    apiKey: process.env.SHOPIFY_API_KEY || "",
  };
};

export default function App() {
  const { apiKey, redirectTo } = useLoaderData<typeof loader>();

  // React beklemeden anında çalışır
  if (redirectTo) {
    return (
      <html>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.top.location.href = ${JSON.stringify(redirectTo)};`,
            }}
          />
        </head>
        <body />
      </html>
    );
  }

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

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
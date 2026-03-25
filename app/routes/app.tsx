import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Billing objesini aldık
  const { billing } = await authenticate.admin(request);

  // Kullanıcı uygulamaya girdiğinde ödeme kontrolü yapar
  await billing.require({
    plans: ["professional-monthly"],
    isTest: false, // Geliştirme/test aşamasında para çekmemesi için true
    onFailure: async () => billing.request({ 
      plan: "professional-monthly",
      isTest: false 
    }),
  });

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
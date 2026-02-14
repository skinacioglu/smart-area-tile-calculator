import { useEffect } from "react";
import type { ActionFunctionArgs, HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Blue", "Silver", "Gray", "Stone"][Math.floor(Math.random() * 4)];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product { id title }
        }
      }`,
    { variables: { product: { title: `${color} Tile Sample` } } }
  );
  const responseJson = await response.json();
  return { product: responseJson.data!.productCreate!.product };
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();

  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Sample Product Created");
    }
  }, [fetcher.data?.product?.id, shopify]);

  return (
    <s-page heading="Dashboard">
      <s-section heading="Quick Start Guide 🚀">
        <s-paragraph>
          Welcome! Follow these 3 quick steps to get your <b>Tile Calculator</b> live on your product pages.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Enable:</b> Go to Theme Customize &gt; Default Product &gt; Add Block &gt; Tile Calculator.</s-list-item>
          <s-list-item><b>Connect:</b> Set your <b>Box</b> and <b>Piece</b> coverage Metafields as <b>Decimal</b> type.</s-list-item>
          <s-list-item><b>Launch:</b> Drag the block to your preferred position and save changes.</s-list-item>
        </s-unordered-list>
        <s-paragraph>
          Need more details? Check our <s-link href="/app/advanced-setup-guide">Advanced Setup Guide</s-link>.
        </s-paragraph>
      </s-section>

      <s-section heading="Test Your Setup">
        <s-paragraph>
          Create a sample product to see how the calculator handles new entries.
        </s-paragraph>
        <s-button onClick={() => fetcher.submit({}, { method: "POST" })}>
          Generate Sample Product
        </s-button>
      </s-section>

      <s-section slot="aside" heading="Serkasoft Support">
        <s-paragraph>
          With 24 years of expertise, we're here to help with custom features or technical setup.
        </s-paragraph>
        <s-link href="/app/additional">
          <s-button variant="primary">Get Support</s-button>
        </s-link>
      </s-section>

      <s-section slot="aside" heading="Quick Links">
        <s-unordered-list>
          <s-list-item>
            <s-link href="/app/advanced-setup-guide">Advanced Setup Guide</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://help.shopify.com" target="_blank">Shopify Help Center</s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
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
    <s-page heading="Overview">
      <s-section heading="What is Tile Calculator? 📐">
        <s-paragraph>
          The <b>Tile Calculator</b> is a high-performance tool designed for stores selling tiles, flooring, or any box-based products. It simplifies the buying process by allowing customers to calculate exactly how many boxes they need based on their area measurements, directly on your product page.
        </s-paragraph>
      </s-section>

      <s-section heading="Quick Setup Guide 🚀">
        <s-paragraph>
          Get your calculator running in minutes by following these three core steps:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>
            <b>1. Enable App Block:</b> Go to <i>Theme Customize &gt; Default Product</i>. Add the "Tile Calculator" block and position it under your price or description.
          </s-list-item>
          <s-list-item>
            <b>2. Map Your Data:</b> Connect your <b>Box</b> and <b>Piece</b> coverage values using Shopify Metafields. Ensure they are set to <b>Decimal</b> type for accurate math.
          </s-list-item>
          <s-list-item>
            <b>3. Configure Visibility:</b> Use the block settings to filter which products show the calculator based on Product Type or specific keywords.
          </s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Test with Sample Data">
        <s-paragraph>
          Want to see the calculator in action immediately? Create a sample tile product to test your theme integration and logic.
        </s-paragraph>
        <s-button onClick={() => fetcher.submit({}, { method: "POST" })}>
          Generate Sample Product
        </s-button>
      </s-section>

      <s-section slot="aside" heading="Serkasoft Expertise">
        <s-paragraph>
          With over 24 years in the software industry, we build tools that are reliable and efficient.
        </s-paragraph>
        <s-paragraph>
          Need custom feature development or complex integrations? Our professional team is just an email away.
        </s-paragraph>
        <s-link href="mailto:support@serkasoft.com">
          <s-button variant="primary">Contact Support</s-button>
        </s-link>
      </s-section>

      <s-section slot="aside" heading="Pro Tip">
        <s-paragraph>
          Always preview your changes in a draft theme before publishing to ensure the design perfectly matches your store&apos;s brand.
        </s-paragraph>
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
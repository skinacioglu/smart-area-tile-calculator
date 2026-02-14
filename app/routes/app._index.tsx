import { useEffect } from "react";
import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
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
  const color = ["Blue", "Silver", "Gray", "Stone"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Tile Sample`,
        },
      },
    },
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

  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <s-page heading="Setup & Configuration Guide">
      <s-section heading="You're all set! 🚀">
        <s-paragraph>
          Great news! You’ve successfully installed the <b>Tile Calculator</b>. We’ve made it super easy to get your calculator up and running on your product pages. Just follow these simple steps, and you’ll be ready in no time!
        </s-paragraph>
      </s-section>

      <s-section heading="Step 1: Adding the Calculator to Your Shop">
        <s-paragraph>
          We use a "magic" system called <b>App Blocks</b>. It’s like a LEGO piece—you can snap it into your store without breaking any of your theme's code, and you can move it whenever you like!
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Open your Shopify Admin and go to <b>Online Store &gt; Themes</b>.</s-list-item>
          <s-list-item>Click the <b>Customize</b> button for your current theme.</s-list-item>
          <s-list-item>At the very top of the screen, select <b>Products &gt; Default Product</b>.</s-list-item>
          <s-list-item>On the left side, look for <b>Product Information</b> and click <b>Add Block</b>.</s-list-item>
          <s-list-item>Click the <b>Apps</b> tab, find <b>Tile Calculator</b>, and click it.</s-list-item>
          <s-list-item>Now, just drag that block to where you want it (most people put it right under the price!).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 2: Choosing Where it Shows Up">
        <s-paragraph>
          You might not need a calculator for everything! You can pick and choose which products get it:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Product Types:</b> Only want it for "Tiles" or "Flooring"? Just type those names in, separated by commas.</s-list-item>
          <s-list-item><b>Skip Certain Items:</b> You can hide the calculator for things like "samples" or "molding" by adding those words to the <b>Exclude</b> list.</s-list-item>
          <s-list-item><b>Choose Your Units:</b> Switch between <b>Metric (cm/m)</b> or <b>Imperial (in/ft)</b> depending on what your customers prefer.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 3: Connecting Your Product Info (Metafields)">
        <s-paragraph>
          To give your customers the perfect answer, the calculator needs to know how much area each box or piece covers.
        </s-paragraph>
        <s-paragraph>
          <b>🌟 Super Important:</b> When you set up your info in <i>Settings &gt; Custom Data</i>, make sure you choose <b>"Decimal" (Number)</b> as the type. This helps the calculator do its math perfectly! If you choose "Text," the calculator won't be able to "read" the numbers correctly.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Box Coverage:</b> Put your special code here (like <code>custom.box_coverage</code>).</s-list-item>
          <s-list-item><b>Piece Coverage:</b> Both box and piece coverage values are required for the calculation. Enter your special code for a single piece area here (like <code>custom.piece_coverage</code>).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 4: Making it Match Your Style">
        <s-paragraph>
          Let's make it look like a part of your family!
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Speak Their Language:</b> You can change labels like "Width" or "Total" to any language you want.</s-list-item>
          <s-list-item><b>Play with Colors:</b> Pick the perfect colors for your buttons and text to match your store's vibe.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Serkasoft Expertise">
        <s-paragraph>
          With over 24 years in the software industry, we build tools that are reliable and efficient.
        </s-paragraph>
        <s-paragraph>
          Need a custom pricing logic or a private feature? Our team is ready to help.
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
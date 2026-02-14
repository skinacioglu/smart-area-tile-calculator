import { useEffect } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const shopify = useAppBridge();

  return (
    <s-page heading="User Guide & Configuration">
      <s-section heading="Welcome to Tile Calculator! 🚀">
        <s-paragraph>
          Congratulations! You’ve successfully installed the <b>Tile Calculator</b>. To get your calculator live and running on your product pages, just follow these simple steps below.
        </s-paragraph>
      </s-section>

      <s-section heading="Step 1: Adding the App Block to Your Product Page">
        <s-paragraph>
          We use the "App Block" system to display the calculator. This is a non-destructive method that doesn't mess with your theme code and allows you to move the calculator anywhere you like.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Go to <b>Online Store > Themes</b> in your Shopify Admin.</s-list-item>
          <s-list-item>Click the <b>Customize</b> button next to your active theme.</s-list-item>
          <s-list-item>Select <b>Products > Default Product</b> from the top dropdown menu.</s-list-item>
          <s-list-item>On the left sidebar, under <b>Product Information</b>, click <b>Add Block</b>.</s-list-item>
          <s-list-item>Switch to the <b>Apps</b> tab and select <b>Tile Calculator</b>.</s-list-item>
          <s-list-item>Drag and drop the block to your preferred location (usually right below the price).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 2: Configuring Filters and Units">
        <s-paragraph>
          You might not want the calculator on every single product. You can customize visibility within the block settings:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Product Types:</b> Enter specific types (e.g., "Tiles", "Hardwood") separated by commas to limit visibility.</s-list-item>
          <s-list-item><b>Exclude Terms:</b> Hide the calculator if the product title contains specific words like "sample" or "trim".</s-list-item>
          <s-list-item><b>Measurement System:</b> Choose between <b>Imperial (in/ft)</b> or <b>Metric (cm/m)</b> based on your region.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 3: Connecting Your Data (Metafields)">
        <s-paragraph>
          For the calculator to provide accurate results, it needs to know how much area each box or piece covers.
        </s-paragraph>
        <s-paragraph>
          <b>⚠️ Important Note:</b> When creating your metafields in <i>Settings > Custom Data</i>, you must set the type to <b>"Decimal"</b>. This ensures high precision for calculations and full compatibility with the math engine.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Box Coverage:</b> Enter your metafield path (e.g., <code>custom.box_coverage</code>).</s-list-item>
          <s-list-item><b>Piece Coverage:</b> If applicable, enter the path for single pieces (e.g., <code>custom.piece_coverage</code>).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 4: Design and Localization">
        <s-paragraph>
          Make the calculator look like it was built specifically for your brand:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Translations:</b> Translate labels like "Width", "Length", and "Estimated Total" into your store's language.</s-list-item>
          <s-list-item><b>Visuals:</b> Match button colors, text styles, and spacing with your theme’s existing design palette.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Need Assistance?">
        <s-paragraph>
          If you hit a snag or need a custom technical adjustment, our team is here to help.
        </s-paragraph>
        <s-button url="/app/additional">Go to Support & Contact</s-button>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function AdvancedSetupGuide() {
  return (
    <s-page heading="Advanced Setup Guide">
      <s-section heading="Mastering Your Configuration 🛠️">
        <s-paragraph>
          Welcome to the comprehensive guide. This page provides deep-dive instructions to help you maximize the potential of the <b>Tile Calculator</b>. Since our system is built for high-precision calculations, these details are key to a seamless customer experience.
        </s-paragraph>
      </s-section>

      <s-section heading="Step 1: Adding the App Block (Safe & Clean)">
        <s-paragraph>
          Our calculator uses Shopify's modern <b>App Block</b> system. It works like a "virtual layer," meaning it <b>does not modify or overwrite</b> your theme's liquid files. Your site's core code remains 100% clean, fast, and update-friendly.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Go to <b>Online Store &gt; Themes</b> and click <b>Customize</b>.</s-list-item>
          <s-list-item>Select <b>Products &gt; Default Product</b> from the top dropdown menu.</s-list-item>
          <s-list-item>On the left sidebar, click <b>Add Block</b> under Product Information.</s-list-item>
          <s-list-item>Choose <b>Tile Calculator</b> and position it where it looks best (usually right under the price).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 2: Connecting Metafields (The Math Engine)">
        <s-paragraph>
          To calculate the box-based price correctly, the engine requires two specific data points: <b>Box Coverage</b> and <b>Piece Coverage</b>. Both are essential for the math to work.
        </s-paragraph>
        <s-paragraph>
          <b>🌟 Critical Note:</b> When you create these metafields in <i>Settings &gt; Custom Data</i>, you <b>must</b> set the type to <b>&quot;Decimal&quot; (Number)</b>. The calculator cannot process data stored as &quot;Single line text.&quot;
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Box Coverage:</b> The total area one full box covers (e.g., <code>custom.box_coverage</code>).</s-list-item>
          <s-list-item><b>Piece Coverage:</b> The area a single tile covers (e.g., <code>custom.piece_coverage</code>).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 3: Visibility and Filters">
        <s-paragraph>
          Don't want the calculator on every product? Use these filters in the block settings:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Product Types:</b> Type in specific categories like &quot;Tiles&quot; or &quot;Flooring&quot; (comma-separated).</s-list-item>
          <s-list-item><b>Exclude Terms:</b> Hide the tool for items containing keywords like &quot;sample&quot; or &quot;molding.&quot;</s-list-item>
          <s-list-item><b>Measurement Units:</b> Choose between <b>Metric (m/cm)</b> and <b>Imperial (ft/in)</b>.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 4: Customization & Localization">
        <s-paragraph>
          Match the calculator to your brand's look and feel effortlessly:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Labels:</b> Translate or rename fields like &quot;Width,&quot; &quot;Length,&quot; or &quot;Total Price&quot; to any language.</s-list-item>
          <s-list-item><b>Visuals:</b> Adjust button colors, text styles, and spacing directly within the Shopify Theme Editor.</s-list-item>
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
          Always preview your changes in a draft theme before publishing to ensure the design perfectly matches your store's brand.
        </s-paragraph>
      </s-section>

      <s-section slot="aside" heading="Quick Links">
        <s-unordered-list>
          <s-list-item>
            <s-link href="/app">Back to Dashboard</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://help.shopify.com" target="_blank">Shopify Help Center</s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs: any) => {
  return boundary.headers(headersArgs);
};
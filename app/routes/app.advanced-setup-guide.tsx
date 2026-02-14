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
          Welcome to the comprehensive guide. This page provides deep-dive instructions to help you maximize the potential of the <b>Tile Calculator</b> for your unique store requirements. Since our system is built for high-precision calculations, these details are key to a seamless customer experience.
        </s-paragraph>
      </s-section>

      <s-section heading="Step 1: Adding the App Block">
        <s-paragraph>
          Our calculator uses Shopify's modern App Block system. The biggest advantage? It works like a "virtual layer." It does not modify or overwrite your theme's liquid files, ensuring your site's core code remains 100% clean and untouched.
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
          To provide accurate calculations, the engine requires two specific data points from your products: <b>Box Coverage</b> and <b>Piece Coverage</b>.
        </s-paragraph>
        <s-paragraph>
          <b>🌟 Critical Note:</b> When you create these metafields in <i>Settings &gt; Custom Data</i>, you <b>must</b> set the type to <b>&quot;Decimal&quot; (Number)</b>. The calculator cannot process data stored as &quot;Single line text.&quot;
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Box Coverage:</b> Enter the path for your full box area (e.g., <code>custom.box_coverage</code>).</s-list-item>
          <s-list-item><b>Piece Coverage:</b> Enter the path for your single tile/plank area (e.g., <code>custom.piece_coverage</code>).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 3: Visibility and Filters">
        <s-paragraph>
          You can control exactly which products show the calculator using the block settings:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Product Types:</b> Limit visibility to specific categories like &quot;Ceramic&quot; or &quot;Vinyl.&quot;</s-list-item>
          <s-list-item><b>Exclude Terms:</b> Hide the tool for products that contain keywords like &quot;sample&quot; or &quot;trim.&quot;</s-list-item>
          <s-list-item><b>Measurement Units:</b> Toggle between <b>Metric (m/cm)</b> and <b>Imperial (ft/in)</b> to match your store&apos;s region.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Serkasoft Expertise">
        <s-paragraph>
          With over 24 years in the software industry, we specialize in building tools that just work.
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

export const headers = (headersArgs: any) => {
  return boundary.headers(headersArgs);
};
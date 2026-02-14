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
  const color = ["Red", "Orange", "Yellow", "Green"][
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

  return (
    <s-page heading="User Guide & Configuration">
      <s-section heading="Welcome to Tile Calculator! 🚀">
        <s-paragraph>
          Congratulations! You’ve successfully installed the <b>Tile Calculator</b>. To get your calculator live and running on your product pages, just follow these simple steps below.
        </s-paragraph>
      </s-section>

      <s-section heading="Step 1: Adding the App Block to Your Product Page">
        <s-paragraph>
          We use the "App Block" system to display the calculator. This is a non-destructive method that doesn't mess with your theme code.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Go to <b>Online Store > Themes</b> and click <b>Customize</b>.</s-list-item>
          <s-list-item>Select <b>Products > Default Product</b> from the top menu.</List.Item>
          <s-list-item>On the left sidebar, click <b>Add Block</b> under Product Information.</List.Item>
          <s-list-item>Select <b>Tile Calculator</b> and drag it to your preferred location.</List.Item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 2: Configuring Filters and Units">
        <s-paragraph>
          Customize how the calculator behaves within the block settings:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Product Types:</b> Enter specific types (e.g., "Tiles") to limit visibility.</s-list-item>
          <s-list-item><b>Measurement System:</b> Choose between <b>Imperial (in/ft)</b> or <b>Metric (cm/m)</b>.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 3: Connecting Your Data (Metafields)">
        <s-paragraph>
          <b>⚠️ Important Note:</b> When creating your metafields in <i>Settings > Custom Data</i>, you must set the type to <b>"Decimal"</b>. This ensures high precision for calculations.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Box Coverage:</b> Enter your metafield path (e.g., <code>custom.box_coverage</code>).</s-list-item>
          <s-list-item><b>Piece Coverage:</b> Enter your piece path if applicable (e.g., <code>custom.piece_coverage</code>).</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Step 4: Design and Localization">
        <s-paragraph>
          Match the calculator with your brand's look and feel:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Translations:</b> Update labels like "Width" and "Length" in your store's language.</s-list-item>
          <s-list-item><b>Colors:</b> Adjust button and text colors to match your theme palette.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Support">
        <s-paragraph>
          Need help? Our 24-year software expertise at <b>Serkasoft</b> is here for you.
        </s-paragraph>
        <s-link href="/app/additional">
          <s-button>Contact Support</s-button>
        </s-link>
      </s-section>

      <s-section slot="aside" heading="Pro Tip">
        <s-paragraph>
          Always test your settings in a "Draft" or "Preview" theme before going live.
        </s-paragraph>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
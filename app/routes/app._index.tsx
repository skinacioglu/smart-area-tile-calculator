// ... (Importlar ve Loader/Action aynı kalıyor)

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();

  return (
    <s-page heading="Quick Setup Guide">
      <s-section heading="1. Activate in Theme 🎨">
        <s-paragraph>
          Go to your <b>Theme Editor</b>, select <b>Default Product</b>, and simply <b>Add Block</b>. Drag "Tile Calculator" wherever you want it to appear.
        </s-paragraph>
      </s-section>

      <s-section heading="2. Connect Your Data (Metafields) ⚙️">
        <s-paragraph>
          For accurate calculations, our engine requires both <b>Box</b> and <b>Piece</b> coverage values. 
        </s-paragraph>
        <s-paragraph>
          <b>⚠️ Important:</b> Metafields must be set to <b>"Decimal"</b> type in <i>Settings &gt; Custom Data</i>.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item><b>Box Coverage:</b> e.g., <code>custom.box_coverage</code></s-list-item>
          <s-list-item><b>Piece Coverage:</b> e.g., <code>custom.piece_coverage</code></s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Support">
        <s-paragraph>
          Serkasoft provides 24 years of software expertise. Need a custom tweak?
        </s-paragraph>
        <s-link href="/app/additional">
          <s-button>Contact Support</s-button>
        </s-link>
      </s-section>
    </s-page>
  );
}
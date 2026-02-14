export default function AdditionalPage() {
  return (
    <s-page heading="Support & Contact">
      <s-section heading="How can we help you?">
        <s-paragraph>
          Need help with the <b>Tile Calculator</b>? Our team at <b>Serkasoft</b> is here to ensure your shop runs perfectly. Whether it's a technical issue or a custom feature request, feel free to reach out.
        </s-paragraph>
      </s-section>

      <s-section heading="Contact Information">
        <s-paragraph>
          For fast support, you can use the following channels:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>
            <b>Email:</b> <s-link href="mailto:support@serkasoft.com">support@serkasoft.com</s-link>
          </s-list-item>
          <s-list-item>
            <b>Response Time:</b> Usually within 24 hours (Monday - Friday).
          </s-list-item>
          <s-list-item>
            <b>Website:</b> <s-link href="https://serkasoft.com" target="_blank">www.serkasoft.com</s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Custom Calculations">
        <s-paragraph>
          Do you have specific tile sizes or complex area calculations? We can build custom logic specifically for your store's theme.
        </s-paragraph>
        <s-button url="mailto:support@serkasoft.com">Request Custom Feature</s-button>
      </s-section>

      <s-section slot="aside" heading="Quick Links">
        <s-unordered-list>
          <s-list-item>
            <s-link href="/app">Back to User Guide</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://help.shopify.com" target="_blank">Shopify Help Center</s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}
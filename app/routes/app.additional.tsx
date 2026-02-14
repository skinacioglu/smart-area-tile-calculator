export default function AdditionalPage() {
  return (
    <s-page heading="Support & Contact">
      <s-section heading="How can we help you?">
        <s-paragraph>
          Need help with the Tile Calculator? Our team at Serkasoft is here to ensure your shop runs perfectly. Whether it's a technical issue or a custom feature request, feel free to reach out.
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

      <s-section heading="Custom Shopify Solutions">
        <s-paragraph>
          Beyond the Tile Calculator, Serkasoft specializes in building high-performance, custom Shopify applications and bespoke theme integrations. 
        </s-paragraph>
        <s-paragraph>
          Whether you need a unique pricing logic, a custom API integration, or a fully tailored private app to automate your workflow, our 24 years of software expertise is at your service.
        </s-paragraph>
        <s-link href="mailto:support@serkasoft.com?subject=Custom Shopify Project Request">
          <s-button variant="primary">Request Custom Solution</s-button>
        </s-link>
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
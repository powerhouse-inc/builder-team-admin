import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  description:
    "A document that contains expenses for n amount wallets across different dimensions, such as expense types and categories. The flow inside a new expense report starts with the user adding wallets that would represent the expenses. Each wallet would be able to extract the expenses from the list of billing statements that are added to the wallet. From the billing statements, the line items inside the wallet are built with the rich data. For example, a line item has a tag that could be directly linked to a LineItemGroup by the group field. Once all line items are added to the Wallet.lineItems list, the next Wallet.totals field could start being populated. This Wallet.total field holds a list of GroupTotals. These group totals aggregate the line item values by the group they belong to. Once the Wallet.totals is finished, the user will be able to see a full expense report. The last steps for the user are to set the periodStart and periodEnd fields to complete the report. ",
  extension: "",
  id: "powerhouse/expense-report",
  name: "ExpenseReport",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "",
          id: "17d59066-f922-45f9-b5c4-69bf3e7c951c",
          name: "wallet",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "4aee28bb-309e-4e12-8805-9b57506fcba1",
              name: "ADD_WALLET",
              reducer: "",
              schema:
                "input AddWalletInput {\n  wallet: EthereumAddress!\n  name: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "c7b274ca-b24a-4142-b46a-ecb431b0f502",
              name: "REMOVE_WALLET",
              reducer: "",
              schema:
                "input RemoveWalletInput {\n  wallet: EthereumAddress!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "6e735183-a4fd-4355-8db4-63902d5a7348",
              name: "ADD_BILLING_STATEMENT",
              reducer: "",
              schema:
                "input AddBillingStatementInput {\n  wallet: EthereumAddress!\n  billingStatementId: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "f8c5a682-cff9-4d68-a07e-b8f6187e3d6d",
              name: "REMOVE_BILLING_STATEMENT",
              reducer: "",
              schema:
                "input RemoveBillingStatementInput {\n  wallet: EthereumAddress!\n  billingStatementId: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "6a7fa2df-5ecb-422d-8626-6c74eb1efd35",
              name: "ADD_LINE_ITEM",
              reducer: "",
              schema:
                "input AddLineItemInput {\n  wallet: EthereumAddress!\n  lineItem: LineItemInput!\n}\n\ninput LineItemInput {\n  id: ID!\n  label: String\n  group: ID\n  budget: Float\n  actuals: Float\n  forecast: Float\n  payments: Float\n  comments: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "efe1b4b0-d8bf-4ad0-970e-ea100d197da3",
              name: "UPDATE_LINE_ITEM",
              reducer: "",
              schema:
                "input UpdateLineItemInput {\n  wallet: EthereumAddress!\n  lineItemId: ID!\n  label: String\n  group: ID\n  budget: Float\n  actuals: Float\n  forecast: Float\n  payments: Float\n  comments: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "526341c8-c9fb-4c9e-b948-458a6bd53eda",
              name: "REMOVE_LINE_ITEM",
              reducer: "",
              schema:
                "input RemoveLineItemInput {\n  wallet: EthereumAddress!\n  lineItemId: ID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "1a96ab65-6b2a-4424-906b-75c2d83e6306",
              name: "ADD_LINE_ITEM_GROUP",
              reducer: "",
              schema:
                "input AddLineItemGroupInput {\n  id: ID!\n  label: String\n  parentId: ID\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "847cff5a-32a1-4246-941c-62b0a4045717",
              name: "UPDATE_LINE_ITEM_GROUP",
              reducer: "",
              schema:
                "input UpdateLineItemGroupInput {\n  id: ID!\n  label: String\n  parentId: ID\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "1085423f-fb20-4a9e-8e51-97e317c70d93",
              name: "REMOVE_LINE_ITEM_GROUP",
              reducer: "",
              schema: "input RemoveLineItemGroupInput {\n  id: ID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "fa19fce6-ace0-4867-b50a-7401a1f2a8d4",
              name: "SET_GROUP_TOTALS",
              reducer: "",
              schema:
                "input SetGroupTotalsInput {\n  wallet: EthereumAddress!\n  groupTotals: GroupTotalsInput!\n}\n\ninput GroupTotalsInput {\n  group: ID!\n  totalBudget: Float\n  totalForecast: Float\n  totalActuals: Float\n  totalPayments: Float\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "9671164b-7f09-4cdd-b52e-335791e9f94b",
              name: "REMOVE_GROUP_TOTALS",
              reducer: "",
              schema:
                "input RemoveGroupTotalsInput {\n  wallet: EthereumAddress!\n  groupId: ID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "0b4aa24e-fdd6-46ee-ab87-eefbd51ad9e2",
              name: "SET_PERIOD_START",
              reducer: "",
              schema:
                "input SetPeriodStartInput {\n  periodStart: DateTime!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "3e496dde-9119-4d20-916e-37119b58f5a6",
              name: "SET_PERIOD_END",
              reducer: "",
              schema: "input SetPeriodEndInput {\n  periodEnd: DateTime!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "59eacc42-f916-44c1-ac75-7027d8e69a23",
              name: "UPDATE_WALLET",
              reducer: "",
              schema:
                "input UpdateWalletInput {\n  address: EthereumAddress!\n  name: String\n}",
              scope: "global",
              template: "",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\n  \\"wallets\\": [],\\n   \\"groups\\": [\\n    {\\n      id: \\"57b0fdd7-51f5-4725-8a05-7ab3c15d90c2\\",\\n      label: \\"Headcount Expenses\\",\\n      parentId: null,\\n    },\\n    {\\n      id: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n      label: \\"Non-Headcount Expenses\\",\\n      parentId: null,\\n    },\\n    {\\n      id: \\"e27b7f51-dc22-4ebe-8659-4e41824ae58c\\",\\n      label: \\"Travel & Entertainment\\",\\n      parentId: \\"57b0fdd7-51f5-4725-8a05-7ab3c15d90c2\\",\\n    },\\n    {\\n      id: \\"e4dce6df-1aa6-4861-b9f4-d861ad74d66c\\",\\n      label: \\"Compensation & Benefits\\",\\n      parentId: \\"57b0fdd7-51f5-4725-8a05-7ab3c15d90c2\\",\\n    },\\n    {\\n      id: \\"92e445ba-96af-4793-ae01-9b71035174ba\\",\\n      label: \\"Marketing Expense\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"778dbd41-3d4a-4c8f-9004-7797f04e5b40\\",\\n      label: \\"Admin Expense\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"5f024d53-7d0e-4818-9661-256aee69709d\\",\\n      label: \\"Professional Services\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"659337f4-01c3-495a-89d7-c177c4137620\\",\\n      label: \\"Cost of Goods Sold\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"1d6f0601-966a-4982-811d-981ac28db0b4\\",\\n      label: \\"Software Development Expense\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"800dac9a-5665-4826-a972-b3170c789d92\\",\\n      label: \\"Income Tax Expense\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"30ed3523-c15a-411f-a8f6-7bb6b978f6f8\\",\\n      label: \\"Software Expense\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      id: \\"ba7688ad-1329-4344-8f8a-e0f27dc648b8\\",\\n      label: \\"Gas Expense\\",\\n      parentId: \\"4971def8-64f8-4eab-b69b-a869d10452c2\\",\\n    },\\n    {\\n      label: \\"Budget\\",\\n      parentId: null,\\n      id: \\"465367d1-636a-45a1-9e43-4a48dd074918\\",\\n    },\\n    {\\n      label: \\"Interest Income\\",\\n      parentId: null,\\n      id: \\"aa5b7188-2231-445e-9f3d-7e5d1ce5754f\\",\\n    },\\n    {\\n      label: \\"Other Income Expense (Non-operating)\\",\\n      parentId: null,\\n      id: \\"d1e9bd15-930d-4faa-ba61-8f2a3b1d0e8f\\",\\n    },\\n    {\\n      label: \\"Other Income\\",\\n      parentId: null,\\n      id: \\"133b762c-a240-4a42-8bf6-9c29b3675f91\\",\\n    },\\n    {\\n      label: \\"Current Asset\\",\\n      parentId: null,\\n      id: \\"1c61e841-c599-4c38-944a-7c9450c27d17\\",\\n    },\\n    {\\n      label: \\"Fixed Asset\\",\\n      parentId: null,\\n      id: \\"5a33a954-09d0-4ddd-95fc-c56853de4dbd\\",\\n    },\\n    {\\n      label: \\"Non-Current Asset\\",\\n      parentId: null,\\n      id: \\"75130e59-7c11-44ae-980c-eaa4968a4a56\\",\\n    },\\n    {\\n      label: \\"Current Liability\\",\\n      parentId: null,\\n      id: \\"b3091879-f549-4227-beef-c8d4947be2e7\\",\\n    },\\n    {\\n      label: \\"Non-current Liability\\",\\n      parentId: null,\\n      id: \\"2f64aca7-38db-4ff4-8cc5-8e0952c23151\\",\\n    },\\n    {\\n      label: \\"Owner Equity\\",\\n      parentId: null,\\n      id: \\"42e480eb-9790-49ed-af35-3ab124af556e\\",\\n    },\\n    {\\n      label: \\"Equity\\",\\n      parentId: null,\\n      id: \\"248f0af0-74b1-4fd9-9e7f-3d723f5c4c56\\",\\n    },\\n    {\\n      label: \\"Adjustment A/C\\",\\n      parentId: null,\\n      id: \\"5044752a-5618-4ab2-90b7-54b5d95e38cf\\",\\n    },\\n    {\\n      label: \\"Temporary Holding Account\\",\\n      parentId: null,\\n      id: \\"566fede7-b593-43d0-84b6-50301e5a84ed\\",\\n    },\\n    {\\n      label: \\"Other\\",\\n      parentId: null,\\n      id: \\"f0077e3f-2931-4637-8715-ba3a01ce3786\\",\\n    },\\n    {\\n      label: \\"Internal Transfers\\",\\n      parentId: null,\\n      id: \\"470504f0-a89f-4555-a46e-667c74240238\\",\\n    },\\n  ],\\n  \\"periodStart\\": null,\\n  \\"periodEnd\\": null\\n}"',
          schema:
            "type ExpenseReportState {\n  wallets: [Wallet!]!\n  groups: [LineItemGroup!]!\n  periodStart: DateTime\n  periodEnd: DateTime\n}\n\ntype Wallet {\n  name: String\n  wallet: EthereumAddress\n  totals: [GroupTotals]\n  billingStatements: [OID]\n  lineItems: [LineItem]\n}\n\ntype LineItemGroup {\n  id: ID!\n  label: String\n  parentId: ID\n}\n\ntype GroupTotals {\n  group: ID  ## LineItemGroupId\n  totalBudget: Float\n  totalForecast: Float\n  totalActuals: Float\n  totalPayments: Float\n}\n\ntype LineItem {\n  id: ID\n  label: String\n  group: ID  ## LineItemGroupId\n  budget: Float\n  actuals: Float\n  forecast: Float\n  payments: Float\n  comments: String\n}",
        },
        local: {
          examples: [],
          initialValue: '""',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};

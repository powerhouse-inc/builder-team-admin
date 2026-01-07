import { z } from "zod";
import type {
  AddBillingStatementInput,
  AddLineItemGroupInput,
  AddLineItemInput,
  AddWalletInput,
  ExpenseReportState,
  GroupTotals,
  GroupTotalsInput,
  LineItem,
  LineItemGroup,
  LineItemInput,
  RemoveBillingStatementInput,
  RemoveGroupTotalsInput,
  RemoveLineItemGroupInput,
  RemoveLineItemInput,
  RemoveWalletInput,
  SetGroupTotalsInput,
  SetPeriodEndInput,
  SetPeriodStartInput,
  UpdateLineItemGroupInput,
  UpdateLineItemInput,
  UpdateWalletInput,
  Wallet,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddBillingStatementInputSchema(): z.ZodObject<
  Properties<AddBillingStatementInput>
> {
  return z.object({
    billingStatementId: z.string(),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function AddLineItemGroupInputSchema(): z.ZodObject<
  Properties<AddLineItemGroupInput>
> {
  return z.object({
    id: z.string(),
    label: z.string().nullish(),
    parentId: z.string().nullish(),
  });
}

export function AddLineItemInputSchema(): z.ZodObject<
  Properties<AddLineItemInput>
> {
  return z.object({
    lineItem: z.lazy(() => LineItemInputSchema()),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function AddWalletInputSchema(): z.ZodObject<
  Properties<AddWalletInput>
> {
  return z.object({
    name: z.string().nullish(),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function ExpenseReportStateSchema(): z.ZodObject<
  Properties<ExpenseReportState>
> {
  return z.object({
    __typename: z.literal("ExpenseReportState").optional(),
    groups: z.array(LineItemGroupSchema()),
    periodEnd: z.string().datetime().nullable(),
    periodStart: z.string().datetime().nullable(),
    wallets: z.array(WalletSchema()),
  });
}

export function GroupTotalsSchema(): z.ZodObject<Properties<GroupTotals>> {
  return z.object({
    __typename: z.literal("GroupTotals").optional(),
    group: z.string().nullable(),
    totalActuals: z.number().nullable(),
    totalBudget: z.number().nullable(),
    totalForecast: z.number().nullable(),
    totalPayments: z.number().nullable(),
  });
}

export function GroupTotalsInputSchema(): z.ZodObject<
  Properties<GroupTotalsInput>
> {
  return z.object({
    group: z.string(),
    totalActuals: z.number().nullish(),
    totalBudget: z.number().nullish(),
    totalForecast: z.number().nullish(),
    totalPayments: z.number().nullish(),
  });
}

export function LineItemSchema(): z.ZodObject<Properties<LineItem>> {
  return z.object({
    __typename: z.literal("LineItem").optional(),
    actuals: z.number().nullable(),
    budget: z.number().nullable(),
    comments: z.string().nullable(),
    forecast: z.number().nullable(),
    group: z.string().nullable(),
    id: z.string().nullable(),
    label: z.string().nullable(),
    payments: z.number().nullable(),
  });
}

export function LineItemGroupSchema(): z.ZodObject<Properties<LineItemGroup>> {
  return z.object({
    __typename: z.literal("LineItemGroup").optional(),
    id: z.string(),
    label: z.string().nullable(),
    parentId: z.string().nullable(),
  });
}

export function LineItemInputSchema(): z.ZodObject<Properties<LineItemInput>> {
  return z.object({
    actuals: z.number().nullish(),
    budget: z.number().nullish(),
    comments: z.string().nullish(),
    forecast: z.number().nullish(),
    group: z.string().nullish(),
    id: z.string(),
    label: z.string().nullish(),
    payments: z.number().nullish(),
  });
}

export function RemoveBillingStatementInputSchema(): z.ZodObject<
  Properties<RemoveBillingStatementInput>
> {
  return z.object({
    billingStatementId: z.string(),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function RemoveGroupTotalsInputSchema(): z.ZodObject<
  Properties<RemoveGroupTotalsInput>
> {
  return z.object({
    groupId: z.string(),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function RemoveLineItemGroupInputSchema(): z.ZodObject<
  Properties<RemoveLineItemGroupInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveLineItemInputSchema(): z.ZodObject<
  Properties<RemoveLineItemInput>
> {
  return z.object({
    lineItemId: z.string(),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function RemoveWalletInputSchema(): z.ZodObject<
  Properties<RemoveWalletInput>
> {
  return z.object({
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function SetGroupTotalsInputSchema(): z.ZodObject<
  Properties<SetGroupTotalsInput>
> {
  return z.object({
    groupTotals: z.lazy(() => GroupTotalsInputSchema()),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function SetPeriodEndInputSchema(): z.ZodObject<
  Properties<SetPeriodEndInput>
> {
  return z.object({
    periodEnd: z.string().datetime(),
  });
}

export function SetPeriodStartInputSchema(): z.ZodObject<
  Properties<SetPeriodStartInput>
> {
  return z.object({
    periodStart: z.string().datetime(),
  });
}

export function UpdateLineItemGroupInputSchema(): z.ZodObject<
  Properties<UpdateLineItemGroupInput>
> {
  return z.object({
    id: z.string(),
    label: z.string().nullish(),
    parentId: z.string().nullish(),
  });
}

export function UpdateLineItemInputSchema(): z.ZodObject<
  Properties<UpdateLineItemInput>
> {
  return z.object({
    actuals: z.number().nullish(),
    budget: z.number().nullish(),
    comments: z.string().nullish(),
    forecast: z.number().nullish(),
    group: z.string().nullish(),
    label: z.string().nullish(),
    lineItemId: z.string(),
    payments: z.number().nullish(),
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
  });
}

export function UpdateWalletInputSchema(): z.ZodObject<
  Properties<UpdateWalletInput>
> {
  return z.object({
    accountDocumentId: z.string().nullish(),
    accountTransactionsDocumentId: z.string().nullish(),
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum address format",
    }),
    name: z.string().nullish(),
  });
}

export function WalletSchema(): z.ZodObject<Properties<Wallet>> {
  return z.object({
    __typename: z.literal("Wallet").optional(),
    accountDocumentId: z.string().nullable(),
    accountTransactionsDocumentId: z.string().nullable(),
    billingStatements: z.array(z.string().nullable()).nullable(),
    lineItems: z.array(LineItemSchema().nullable()).nullable(),
    name: z.string().nullable(),
    totals: z.array(GroupTotalsSchema().nullable()).nullable(),
    wallet: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullable(),
  });
}

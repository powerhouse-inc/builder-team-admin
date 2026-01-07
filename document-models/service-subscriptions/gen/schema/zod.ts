import { z } from "zod";
import type {
  AddCategoryInput,
  AddSubscriptionInput,
  AddVendorInput,
  AssignMemberInput,
  BillingCycle,
  Category,
  DeleteCategoryInput,
  DeleteSubscriptionInput,
  DeleteVendorInput,
  SeatsAllocation,
  SeatsAllocationInput,
  ServiceSubscription,
  ServiceSubscriptionsState,
  SetTotalSeatsInput,
  SubscriptionStatus,
  UnassignMemberInput,
  UpdateCategoryInput,
  UpdateSubscriptionInput,
  UpdateSubscriptionStatusInput,
  UpdateVendorInput,
  Vendor,
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

export const BillingCycleSchema = z.enum([
  "ANNUAL",
  "BIENNIAL",
  "MONTHLY",
  "ONE_TIME",
  "QUARTERLY",
  "USAGE_BASED",
]);

export const SubscriptionStatusSchema = z.enum([
  "ACTIVE",
  "CANCELLED",
  "EXPIRED",
  "PAUSED",
  "PENDING",
  "TRIAL",
]);

export function AddCategoryInputSchema(): z.ZodObject<
  Properties<AddCategoryInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    name: z.string(),
  });
}

export function AddSubscriptionInputSchema(): z.ZodObject<
  Properties<AddSubscriptionInput>
> {
  return z.object({
    accountEmail: z.string().email().nullish(),
    accountOwner: z.string().nullish(),
    amount: z.number().nullish(),
    autoRenew: z.boolean().nullish(),
    billingCycle: BillingCycleSchema,
    categoryId: z.string().nullish(),
    currency: z.string().nullish(),
    endDate: z.string().datetime().nullish(),
    id: z.string(),
    loginUrl: z.string().url().nullish(),
    name: z.string(),
    nextBillingDate: z.string().datetime().nullish(),
    notes: z.string().nullish(),
    planName: z.string().nullish(),
    seats: z.lazy(() => SeatsAllocationInputSchema().nullish()),
    startDate: z.string().datetime().nullish(),
    status: SubscriptionStatusSchema,
    tags: z.array(z.string()).nullish(),
    vendorId: z.string(),
  });
}

export function AddVendorInputSchema(): z.ZodObject<
  Properties<AddVendorInput>
> {
  return z.object({
    id: z.string(),
    name: z.string(),
    supportEmail: z.string().email().nullish(),
    supportUrl: z.string().url().nullish(),
    website: z.string().url().nullish(),
  });
}

export function AssignMemberInputSchema(): z.ZodObject<
  Properties<AssignMemberInput>
> {
  return z.object({
    memberId: z.string(),
    subscriptionId: z.string(),
  });
}

export function CategorySchema(): z.ZodObject<Properties<Category>> {
  return z.object({
    __typename: z.literal("Category").optional(),
    description: z.string().nullable(),
    id: z.string(),
    name: z.string(),
  });
}

export function DeleteCategoryInputSchema(): z.ZodObject<
  Properties<DeleteCategoryInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteSubscriptionInputSchema(): z.ZodObject<
  Properties<DeleteSubscriptionInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteVendorInputSchema(): z.ZodObject<
  Properties<DeleteVendorInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function SeatsAllocationSchema(): z.ZodObject<
  Properties<SeatsAllocation>
> {
  return z.object({
    __typename: z.literal("SeatsAllocation").optional(),
    assignedMembers: z.array(z.string()),
    total: z.number(),
  });
}

export function SeatsAllocationInputSchema(): z.ZodObject<
  Properties<SeatsAllocationInput>
> {
  return z.object({
    assignedMembers: z.array(z.string()),
    total: z.number(),
  });
}

export function ServiceSubscriptionSchema(): z.ZodObject<
  Properties<ServiceSubscription>
> {
  return z.object({
    __typename: z.literal("ServiceSubscription").optional(),
    accountEmail: z.string().email().nullable(),
    accountOwner: z.string().nullable(),
    amount: z.number().nullable(),
    autoRenew: z.boolean().nullable(),
    billingCycle: BillingCycleSchema,
    categoryId: z.string().nullable(),
    currency: z.string().nullable(),
    endDate: z.string().datetime().nullable(),
    id: z.string(),
    loginUrl: z.string().url().nullable(),
    name: z.string(),
    nextBillingDate: z.string().datetime().nullable(),
    notes: z.string().nullable(),
    planName: z.string().nullable(),
    seats: SeatsAllocationSchema().nullable(),
    startDate: z.string().datetime().nullable(),
    status: SubscriptionStatusSchema,
    tags: z.array(z.string()),
    vendorId: z.string(),
  });
}

export function ServiceSubscriptionsStateSchema(): z.ZodObject<
  Properties<ServiceSubscriptionsState>
> {
  return z.object({
    __typename: z.literal("ServiceSubscriptionsState").optional(),
    categories: z.array(CategorySchema()),
    subscriptions: z.array(ServiceSubscriptionSchema()),
    vendors: z.array(VendorSchema()),
  });
}

export function SetTotalSeatsInputSchema(): z.ZodObject<
  Properties<SetTotalSeatsInput>
> {
  return z.object({
    subscriptionId: z.string(),
    total: z.number(),
  });
}

export function UnassignMemberInputSchema(): z.ZodObject<
  Properties<UnassignMemberInput>
> {
  return z.object({
    memberId: z.string(),
    subscriptionId: z.string(),
  });
}

export function UpdateCategoryInputSchema(): z.ZodObject<
  Properties<UpdateCategoryInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function UpdateSubscriptionInputSchema(): z.ZodObject<
  Properties<UpdateSubscriptionInput>
> {
  return z.object({
    accountEmail: z.string().email().nullish(),
    accountOwner: z.string().nullish(),
    amount: z.number().nullish(),
    autoRenew: z.boolean().nullish(),
    billingCycle: BillingCycleSchema.nullish(),
    categoryId: z.string().nullish(),
    currency: z.string().nullish(),
    endDate: z.string().datetime().nullish(),
    id: z.string(),
    loginUrl: z.string().url().nullish(),
    name: z.string().nullish(),
    nextBillingDate: z.string().datetime().nullish(),
    notes: z.string().nullish(),
    planName: z.string().nullish(),
    startDate: z.string().datetime().nullish(),
    tags: z.array(z.string()).nullish(),
    vendorId: z.string().nullish(),
  });
}

export function UpdateSubscriptionStatusInputSchema(): z.ZodObject<
  Properties<UpdateSubscriptionStatusInput>
> {
  return z.object({
    id: z.string(),
    status: SubscriptionStatusSchema,
  });
}

export function UpdateVendorInputSchema(): z.ZodObject<
  Properties<UpdateVendorInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
    supportEmail: z.string().email().nullish(),
    supportUrl: z.string().url().nullish(),
    website: z.string().url().nullish(),
  });
}

export function VendorSchema(): z.ZodObject<Properties<Vendor>> {
  return z.object({
    __typename: z.literal("Vendor").optional(),
    id: z.string(),
    name: z.string(),
    supportEmail: z.string().email().nullable(),
    supportUrl: z.string().url().nullable(),
    website: z.string().url().nullable(),
  });
}

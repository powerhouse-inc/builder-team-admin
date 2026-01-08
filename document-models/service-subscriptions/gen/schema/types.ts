export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Upload: { input: File; output: File };
};

export type AddCategoryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
};

export type AddSubscriptionInput = {
  accountEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  accountOwner?: InputMaybe<Scalars["String"]["input"]>;
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  autoRenew?: InputMaybe<Scalars["Boolean"]["input"]>;
  billingCycle: BillingCycle;
  categoryId?: InputMaybe<Scalars["OID"]["input"]>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  endDate?: InputMaybe<Scalars["Date"]["input"]>;
  id: Scalars["OID"]["input"];
  loginUrl?: InputMaybe<Scalars["URL"]["input"]>;
  name: Scalars["String"]["input"];
  nextBillingDate?: InputMaybe<Scalars["Date"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  planName?: InputMaybe<Scalars["String"]["input"]>;
  seats?: InputMaybe<SeatsAllocationInput>;
  startDate?: InputMaybe<Scalars["Date"]["input"]>;
  status: SubscriptionStatus;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vendorId: Scalars["OID"]["input"];
};

export type AddVendorInput = {
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  supportEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  supportUrl?: InputMaybe<Scalars["URL"]["input"]>;
  website?: InputMaybe<Scalars["URL"]["input"]>;
};

export type AssignMemberInput = {
  memberId: Scalars["PHID"]["input"];
  subscriptionId: Scalars["OID"]["input"];
};

export type BillingCycle =
  | "ANNUAL"
  | "BIENNIAL"
  | "MONTHLY"
  | "ONE_TIME"
  | "QUARTERLY"
  | "USAGE_BASED";

export type Category = {
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
};

export type DeleteCategoryInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteSubscriptionInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteVendorInput = {
  id: Scalars["OID"]["input"];
};

export type SeatsAllocation = {
  assignedMembers: Array<Scalars["PHID"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type SeatsAllocationInput = {
  assignedMembers: Array<Scalars["PHID"]["input"]>;
  total: Scalars["Int"]["input"];
};

export type ServiceSubscription = {
  accountEmail: Maybe<Scalars["EmailAddress"]["output"]>;
  accountOwner: Maybe<Scalars["String"]["output"]>;
  amount: Maybe<Scalars["Amount_Money"]["output"]>;
  autoRenew: Maybe<Scalars["Boolean"]["output"]>;
  billingCycle: BillingCycle;
  categoryId: Maybe<Scalars["OID"]["output"]>;
  currency: Maybe<Scalars["Currency"]["output"]>;
  endDate: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["OID"]["output"];
  loginUrl: Maybe<Scalars["URL"]["output"]>;
  name: Scalars["String"]["output"];
  nextBillingDate: Maybe<Scalars["Date"]["output"]>;
  notes: Maybe<Scalars["String"]["output"]>;
  planName: Maybe<Scalars["String"]["output"]>;
  seats: Maybe<SeatsAllocation>;
  startDate: Maybe<Scalars["Date"]["output"]>;
  status: SubscriptionStatus;
  tags: Array<Scalars["String"]["output"]>;
  vendorId: Scalars["OID"]["output"];
};

export type ServiceSubscriptionsState = {
  categories: Array<Category>;
  subscriptions: Array<ServiceSubscription>;
  vendors: Array<Vendor>;
};

export type SetTotalSeatsInput = {
  subscriptionId: Scalars["OID"]["input"];
  total: Scalars["Int"]["input"];
};

export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELLED"
  | "EXPIRED"
  | "PAUSED"
  | "PENDING"
  | "TRIAL";

export type UnassignMemberInput = {
  memberId: Scalars["PHID"]["input"];
  subscriptionId: Scalars["OID"]["input"];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateSubscriptionInput = {
  accountEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  accountOwner?: InputMaybe<Scalars["String"]["input"]>;
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  autoRenew?: InputMaybe<Scalars["Boolean"]["input"]>;
  billingCycle?: InputMaybe<BillingCycle>;
  categoryId?: InputMaybe<Scalars["OID"]["input"]>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  endDate?: InputMaybe<Scalars["Date"]["input"]>;
  id: Scalars["OID"]["input"];
  loginUrl?: InputMaybe<Scalars["URL"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  nextBillingDate?: InputMaybe<Scalars["Date"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  planName?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["Date"]["input"]>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vendorId?: InputMaybe<Scalars["OID"]["input"]>;
};

export type UpdateSubscriptionStatusInput = {
  id: Scalars["OID"]["input"];
  status: SubscriptionStatus;
};

export type UpdateVendorInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  supportEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  supportUrl?: InputMaybe<Scalars["URL"]["input"]>;
  website?: InputMaybe<Scalars["URL"]["input"]>;
};

export type Vendor = {
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  supportEmail: Maybe<Scalars["EmailAddress"]["output"]>;
  supportUrl: Maybe<Scalars["URL"]["output"]>;
  website: Maybe<Scalars["URL"]["output"]>;
};

export const TicketCategory = {
  OrderIssue: "OrderIssue",
  PaymentIssue: "PaymentIssue",
  ProductIssue: "ProductIssue",
  ShippingIssue: "ShippingIssue",
  Other: "Other",
} as const;
export type TicketCategory = (typeof TicketCategory)[keyof typeof TicketCategory];

export const TicketStatus = {
  Open: "Open",
  InProgress: "InProgress",
  Resolved: "Resolved",
  Closed: "Closed",
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export type SupportTicketDto = {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: string;
  orderId: string;
  createdAt: string;
  userId: string;
  userFullName: string;
  userEmail: string;
};

export type CreateSupportTicketDto = {
  orderId: string;
  category: TicketCategory;
  status: TicketStatus;
  subject: string;
  description: string;
};

export type SupportTicketParams = {
  orderBy?: string;
  status?: string;
  category?: string;
  createdOn?: string;
  pageNumber?: number;
  pageSize?: number;
};

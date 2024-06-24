export type TableName =
  | "cart"
  | "users"
  | "msgs"
  | "user_msgs"
  | "chat_members"
  | "goods"
  | "order_goods_list"
  | "orders"
  | "seller_orders"
  | "store";
export const tableMap: Record<TableName, TableName> = {
  cart: "cart",
  users: "users",
  msgs: "msgs",
  user_msgs: "user_msgs",
  chat_members: "chat_members",
  goods: "goods",
  order_goods_list: "order_goods_list",
  orders: "orders",
  seller_orders: "seller_orders",
  store: "store",
};
export type UserData = {
  user_id: number | null;
  store_id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  user_address: string;
  status: number | null;
  user_phone: string;
};
export type UserTG = {
  allowsWriteToPm: boolean;
  firstName: string;
  id: number | null;
  isPremium: boolean;
  languageCode: string;
  lastName: string;
  username: string;
};
export type GoodData = {
  good_id: number | null;
  good_photo: string;
  good_name: string;
  good_owner: string;
  good_description: string;
  good_price: number | null;
  good_stock: number | null;
  status: number | null;
};

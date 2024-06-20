export type TableName =
  | "artist"
  | "users"
  | "msgs"
  | "chat_members"
  | "group_config"
  | "group_tags"
  | "user_in_chat"
  | "user_tasks"
  | "tasks";
export const tableMap: Record<TableName, TableName> = {
  artist: "artist",
  users: "users",
  msgs: "msgs",
  chat_members: "chat_members",
  group_config: "group_config",
  group_tags: "group_tags",
  user_in_chat: "user_in_chat",
  tasks: "tasks",
  user_tasks: "user_tasks",
};
export type UserData = {
  user_id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  evm_address: string;
  google: string;
  twitter: string;
  github: string;
  recaptcha: boolean;
  email: string;
  score: Array<number>;
  ton_address: string;
  inviteFrom_id: number | null;
  testScore: number | null;
  friends: Array<number>;
  tokens: number | null;
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

export type EventType =
  | "firstTest"
  | "aiChat"
  | "inviteFriends"
  | "overFiveFriends"
  | "connectWallet"
  | "dailyGame"
  | "dailyGameHighScore"
  | "buyToken";
//TODO: 新增事件上限
export enum EventEnum {
  firstTest = "firstTest",
  aiChat = "aiChat",
  inviteFriends = "inviteFriends",
  overFiveFriends = "overFiveFriends", //TODO: add this event
  connectWallet = "connectWallet",
  dailyGame = "dailyGame",
  dailyGameHighScore = "dailyGameHighScore",
  buyToken = "buyToken",
}

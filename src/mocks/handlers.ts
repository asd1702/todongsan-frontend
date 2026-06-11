import { authHandlers } from "./authHandlers";
import { marketHandlers } from "./marketHandlers";
import { battleHandlers } from "./battleHandlers";
import { pointHandlers } from "./pointHandlers";

export const handlers = [
  ...authHandlers,
  ...marketHandlers,
  ...battleHandlers,
  ...pointHandlers,
];

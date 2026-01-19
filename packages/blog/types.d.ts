import type { User as _User } from "nuxt-auth-utils";

declare module "nuxt-auth-utils" {
  interface User {
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
  }
}

declare module "#auth-utils" {
  interface User {
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
  }
}

export {};

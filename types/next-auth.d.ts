import "next-auth";

declare module "next-auth" {
  export interface Session {
    user: any;
    accessToken: unknown;
  }
}

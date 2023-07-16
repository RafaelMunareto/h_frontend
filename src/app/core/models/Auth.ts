export interface Auth {
  DomainName: string;
  UserName: string;
  Workstation: string;
  Authenticated: boolean;
  jwt: string;
}

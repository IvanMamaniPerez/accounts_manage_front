export interface UserInterface {
    id                : string;
    name              : string;
    email             : string;
    status_register   : string;
    country_code      : string;
    timezone_current  : string;
    currency_current  : string;
    roles             : string[];
    email_verified_at?: string;
    permissions      ?: string[];
}
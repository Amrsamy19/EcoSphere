export const PUBLIC_ROUTES = [
	"/",
	"/auth/login",
	"/auth/register",
	"/auth/error",
];

// Protected: must be signed in
export const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];

// Role-based rules (optional, but scalable)
export const ROLE_ROUTES: Record<string, string[]> = {
	"/admin": ["admin"],
	"/vendor": ["vendor", "admin"],
};

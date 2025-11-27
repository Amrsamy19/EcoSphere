import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from "./route.config";
import { AuthSession, checkRoleAccess } from "./role.guards";

export const applyAuthRules = (
	req: NextRequest,
	session: AuthSession,
	pathname: string
) => {
	const isAuthenticated = !!session;
	const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
	const isProtected = PROTECTED_ROUTES.some((route) =>
		pathname.startsWith(route)
	);

	// 1. If user is logged in, block /auth/*
	if (isAuthenticated && pathname.startsWith("/auth")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// 2. If user is NOT logged in but route is protected
	if (!isAuthenticated && isProtected) {
		const loginUrl = new URL("/auth/login", req.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	// 3. If user is logged in, check RBAC rules
	const roleCheck = checkRoleAccess(req, session, pathname);
	if (roleCheck) return roleCheck;

	return null;
};

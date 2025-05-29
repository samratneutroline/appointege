// // import authConfig from "@/auth.config"
// // import NextAuth from "next-auth"
// import {
//   apiAuthPrefix,
//   authRoutes,
//   DEFAULT_LOGGEDIN_ADMIN_REDIRECT,
//   DEFAULT_LOGGEDIN_SUPER_ADMIN_REDIRECT,
//   DEFAULT_LOGGEDIN_USER_REDIRECT,
//   DEFAULT_UNLOGGEDIN_REDIRECT,
//   publicRoutes,
//   userRoutes,
// } from "./routes"
// import { NextResponse } from "next/server"
// import { auth } from "@/auth"

// // Use only one of the two middleware options below
// // 1. Use middleware directly
// // export const { auth: middleware } = NextAuth(authConfig)

// // 2. Wrapped middleware option
// // const { auth } = NextAuth(authConfig)
// export default auth((req) => {
//   const { nextUrl } = req
//   console.log("Middleware running for:", nextUrl.pathname)
//   console.log("Authenticated user:", req.auth)
//   const role = req.auth?.user?.role
//   console.log("User role:", role)
//   const isLoggedIn = !!req.auth

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

//   // Orders matters:
//   // 1. Authentication middleware should run before any other middleware
//   if (isApiAuthRoute) {
//     // Allow access to API auth routes without authentication
//     // do nothing if the request is for API auth routes
//     return
//   }

//   // 2. If the user is logged in, they should not access auth routes but redirect to the home page or admin dashboard or super admin dashboard based on their role
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       // If the user is logged in, redirect them to the home page or admin dashboard or super admin dashboard based on their role
//       // TODO: Implement role-based redirection logic

//       const redirectUrl =
//         role === "SUPER_ADMIN"
//           ? DEFAULT_LOGGEDIN_SUPER_ADMIN_REDIRECT
//           : role === "ADMIN"
//           ? DEFAULT_LOGGEDIN_ADMIN_REDIRECT
//           : DEFAULT_LOGGEDIN_USER_REDIRECT

//       return NextResponse.redirect(new URL(redirectUrl, nextUrl))
//     }
//     return
//   }

//   // 3. if user is logged in, they can access protected routes based on their role
//   if (isLoggedIn) {
//     // If the user is logged in, they can access protected routes based on their role
//     // TODO: Implement role-based access logic
//     if (role === "SUPER_ADMIN" && nextUrl.pathname.startsWith("/super-admin")) {
//       return // Allow access to super admin routes
//     }

//     if (role === "ADMIN" && nextUrl.pathname.startsWith("/admin")) {
//       return // Allow access to admin routes
//     }
//     if (role === "USER" && userRoutes.includes(nextUrl.pathname)) {
//       // Allow access to user routes
//       return // Allow access to user routes
//     }
//     // If the user is logged in but does not have access to the requested route, redirect them to the home page or an error page
//     return
//   }

//   // 3. If the user is not logged in, they should not access protected routes, not public routes
//   if (!isLoggedIn && !isPublicRoute) {
//     // If the user is not logged in and the route is not public, redirect them to the login page
//     return NextResponse.redirect(new URL(DEFAULT_UNLOGGEDIN_REDIRECT, nextUrl))
//   }

//   // 4. If the user is logged in or not but made it to a public route, they can access public routes
//   return
// })

// // invoke middlware for specific paths
// // This middleware will only run for the specified paths
// // You can adjust the matcher to include or exclude specific paths as needed

// // match the following routes to invoke above auth()
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// }

// // src/middleware.ts
// import { auth } from "@/auth" // From src/auth.ts
// import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"
// import { NextResponse } from "next/server"

// export default auth((req) => {
//   const { nextUrl } = req
//   console.log("Middleware running for:", nextUrl.pathname)
//   console.log("Authenticated user:", req.auth)
//   const isLoggedIn = !!req.auth

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

//   if (isApiAuthRoute) return
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       const role = req.auth?.user?.role
//       const redirectUrl = role === "USER" ? "/" : "/dashboard"
//       return NextResponse.redirect(new URL(redirectUrl, nextUrl))
//     }
//     return
//   }
//   if (!isLoggedIn && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/login", nextUrl))
//   }
//   return
// })

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)",
//     "/(api|trpc)(.*)",
//   ],
// }

// src/middleware.ts

// src/middleware.ts

// Import authentication function from auth.ts, which includes PrismaAdapter and session callbacks
import { auth } from "@/auth"
// Import route constants from routes.ts for public, auth, role-specific prefixes, and redirect paths
import {
  apiAuthPrefix,
  authRoutes,
  userRoutes,
  adminPrefix,
  superAdminPrefix,
  DEFAULT_LOGGEDIN_ADMIN_REDIRECT,
  DEFAULT_LOGGEDIN_SUPER_ADMIN_REDIRECT,
  DEFAULT_LOGGEDIN_USER_REDIRECT,
  DEFAULT_UNLOGGEDIN_REDIRECT,
  publicRoutes,
} from "./routes"
// Import NextResponse for handling redirects in middleware
import { NextResponse } from "next/server"

// Define middleware using the auth function to check user session and role
export default auth((req) => {
  // Extract the requested URL path
  const { nextUrl } = req
  // Log the current path for debugging
  console.log("Middleware running for:", nextUrl.pathname)
  // Log the authenticated user’s session data (includes id, email, name, role)
  console.log("Authenticated user:", req.auth)
  // Get the user’s role from the session (e.g., "USER", "ADMIN", "SUPER_ADMIN")
  const role = req.auth?.user?.role
  // Log the role for debugging
  console.log("User role:", role)
  // Check if the user is logged in (true if req.auth exists)
  const isLoggedIn = !!req.auth

  // Check if the route is an API authentication route (e.g., /api/auth/*)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  // Check if the route is an authentication route (e.g., /login, /register)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  // Check if the route is public (e.g., /)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  // Order matters for middleware logic:
  // 1. Allow API auth routes to bypass authentication checks
  if (isApiAuthRoute) {
    // Do nothing for API auth routes (e.g., /api/auth/signin) to allow authentication
    return
  }

  // 2. Allow unauthenticated users to access auth routes (e.g., /login)
  if (isAuthRoute && !isLoggedIn) {
    // If the user is not logged in and tries to access auth routes, allow access
    return
  }

  // 3. Redirect logged-in users from auth routes or public root (/) to role-based dashboards
  if (
    isLoggedIn &&
    (isAuthRoute || (isPublicRoute && nextUrl.pathname === "/"))
  ) {
    // Determine redirect URL based on user role
    const redirectUrl =
      role === "SUPER_ADMIN"
        ? DEFAULT_LOGGEDIN_SUPER_ADMIN_REDIRECT // /super-admin
        : role === "ADMIN"
        ? DEFAULT_LOGGEDIN_ADMIN_REDIRECT // /admin
        : DEFAULT_LOGGEDIN_USER_REDIRECT // /dashboard
    // Only redirect if the current path isn’t the target to prevent loops
    if (nextUrl.pathname !== redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, nextUrl))
    }
    return
  }

  // 4. Allow access for logged-in users based on role and route
  if (isLoggedIn) {
    // SUPER_ADMIN: Allow public routes and /super-admin/* routes
    if (
      role === "SUPER_ADMIN" &&
      (isPublicRoute || nextUrl.pathname.startsWith(superAdminPrefix))
    ) {
      return // Allow access
    }

    // ADMIN: Allow public routes and /admin/* routes
    if (
      role === "ADMIN" &&
      (isPublicRoute || nextUrl.pathname.startsWith(adminPrefix))
    ) {
      return // Allow access
    }

    // USER: Allow public routes and user routes (/dashboard/*, /profile/*)
    if (role === "USER") {
      const isUserRoute = userRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      )
      if (isPublicRoute || isUserRoute) {
        return // Allow access
      }
    }

    // Redirect to role-based dashboard if accessing unauthorized route
    const redirectUrl =
      role === "SUPER_ADMIN"
        ? DEFAULT_LOGGEDIN_SUPER_ADMIN_REDIRECT // /super-admin
        : role === "ADMIN"
        ? DEFAULT_LOGGEDIN_ADMIN_REDIRECT // /admin
        : DEFAULT_LOGGEDIN_USER_REDIRECT // /dashboard
    if (nextUrl.pathname !== redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, nextUrl))
    }
    return
  }

  // 5. Redirect unauthenticated users from protected (non-public) routes to the login page
  if (!isLoggedIn && !isPublicRoute) {
    // Redirect to /login for unauthorized access to protected routes
    return NextResponse.redirect(new URL(DEFAULT_UNLOGGEDIN_REDIRECT, nextUrl))
  }

  // 6. Allow access to public routes for all users
  return
})

// Configure which paths trigger the middleware
export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files (e.g., images, CSS, JS)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}

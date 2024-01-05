/** 
 * An array of routes that accessible to the public
 * These routes does not require authentication
 * @type {string[]}
*/

export const publicRoutes = [
    "/"
]

/** 
 * An array of routes that are used for authenticaiton
 * These routes will redirect logged in users to protected routes
 * @type {string[]}
*/

export const authRoutes = [
    "/login",
    "/register"
]

/** 
 * This route is for only Api authentication 
 * Routes that start with these route are used for API authentication
 * @type {string}
*/

export const apiAuthPrefix = "/api/auth"

/** 
 * These route will redirect after logged in
 * @type {string}
*/ 

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
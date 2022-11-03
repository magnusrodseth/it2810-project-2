/**
 * Checks if the route is an index hashed route.
 *
 * @example route='localhost:3000' => true
 * @example route='localhost:3000/#/login' => false
 **/
const isIndexHashedRoute = (route: string) => route === ''

export default isIndexHashedRoute

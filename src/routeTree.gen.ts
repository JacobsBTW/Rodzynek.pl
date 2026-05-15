/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// Ten plik został wygenerowany automatycznie przez TanStack Router.
// Nie wprowadzaj tu ręcznych zmian, bo plik zostanie nadpisany.
// Wyklucz go również z narzędzi sprawdzających i formatujących, żeby nie był modyfikowany.

import { Route as rootRouteImport } from './routes/__root'
import { Route as ZespolRouteImport } from './routes/zespol'
import { Route as WarsztatyRouteImport } from './routes/warsztaty'
import { Route as SitemapDotxmlRouteImport } from './routes/sitemap[.]xml'
import { Route as ProjektRouteImport } from './routes/projekt'
import { Route as ONasRouteImport } from './routes/o-nas'
import { Route as KontaktRouteImport } from './routes/kontakt'
import { Route as AdminRouteImport } from './routes/admin'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ApiContactRouteImport } from './routes/api/contact'
import { Route as ApiAdminSubmissionsRouteImport } from './routes/api/admin/submissions'
import { Route as ApiAdminSessionRouteImport } from './routes/api/admin/session'
import { Route as ApiAdminLogoutRouteImport } from './routes/api/admin/logout'
import { Route as ApiAdminLoginRouteImport } from './routes/api/admin/login'

const ZespolRoute = ZespolRouteImport.update({
  id: '/zespol',
  path: '/zespol',
  getParentRoute: () => rootRouteImport,
} as any)
const WarsztatyRoute = WarsztatyRouteImport.update({
  id: '/warsztaty',
  path: '/warsztaty',
  getParentRoute: () => rootRouteImport,
} as any)
const SitemapDotxmlRoute = SitemapDotxmlRouteImport.update({
  id: '/sitemap.xml',
  path: '/sitemap.xml',
  getParentRoute: () => rootRouteImport,
} as any)
const ProjektRoute = ProjektRouteImport.update({
  id: '/projekt',
  path: '/projekt',
  getParentRoute: () => rootRouteImport,
} as any)
const ONasRoute = ONasRouteImport.update({
  id: '/o-nas',
  path: '/o-nas',
  getParentRoute: () => rootRouteImport,
} as any)
const KontaktRoute = KontaktRouteImport.update({
  id: '/kontakt',
  path: '/kontakt',
  getParentRoute: () => rootRouteImport,
} as any)
const AdminRoute = AdminRouteImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiContactRoute = ApiContactRouteImport.update({
  id: '/api/contact',
  path: '/api/contact',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiAdminSubmissionsRoute = ApiAdminSubmissionsRouteImport.update({
  id: '/api/admin/submissions',
  path: '/api/admin/submissions',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiAdminSessionRoute = ApiAdminSessionRouteImport.update({
  id: '/api/admin/session',
  path: '/api/admin/session',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiAdminLogoutRoute = ApiAdminLogoutRouteImport.update({
  id: '/api/admin/logout',
  path: '/api/admin/logout',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiAdminLoginRoute = ApiAdminLoginRouteImport.update({
  id: '/api/admin/login',
  path: '/api/admin/login',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/kontakt': typeof KontaktRoute
  '/o-nas': typeof ONasRoute
  '/projekt': typeof ProjektRoute
  '/sitemap.xml': typeof SitemapDotxmlRoute
  '/warsztaty': typeof WarsztatyRoute
  '/zespol': typeof ZespolRoute
  '/api/contact': typeof ApiContactRoute
  '/api/admin/login': typeof ApiAdminLoginRoute
  '/api/admin/logout': typeof ApiAdminLogoutRoute
  '/api/admin/session': typeof ApiAdminSessionRoute
  '/api/admin/submissions': typeof ApiAdminSubmissionsRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/kontakt': typeof KontaktRoute
  '/o-nas': typeof ONasRoute
  '/projekt': typeof ProjektRoute
  '/sitemap.xml': typeof SitemapDotxmlRoute
  '/warsztaty': typeof WarsztatyRoute
  '/zespol': typeof ZespolRoute
  '/api/contact': typeof ApiContactRoute
  '/api/admin/login': typeof ApiAdminLoginRoute
  '/api/admin/logout': typeof ApiAdminLogoutRoute
  '/api/admin/session': typeof ApiAdminSessionRoute
  '/api/admin/submissions': typeof ApiAdminSubmissionsRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/kontakt': typeof KontaktRoute
  '/o-nas': typeof ONasRoute
  '/projekt': typeof ProjektRoute
  '/sitemap.xml': typeof SitemapDotxmlRoute
  '/warsztaty': typeof WarsztatyRoute
  '/zespol': typeof ZespolRoute
  '/api/contact': typeof ApiContactRoute
  '/api/admin/login': typeof ApiAdminLoginRoute
  '/api/admin/logout': typeof ApiAdminLogoutRoute
  '/api/admin/session': typeof ApiAdminSessionRoute
  '/api/admin/submissions': typeof ApiAdminSubmissionsRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/kontakt'
    | '/o-nas'
    | '/projekt'
    | '/sitemap.xml'
    | '/warsztaty'
    | '/zespol'
    | '/api/contact'
    | '/api/admin/login'
    | '/api/admin/logout'
    | '/api/admin/session'
    | '/api/admin/submissions'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin'
    | '/kontakt'
    | '/o-nas'
    | '/projekt'
    | '/sitemap.xml'
    | '/warsztaty'
    | '/zespol'
    | '/api/contact'
    | '/api/admin/login'
    | '/api/admin/logout'
    | '/api/admin/session'
    | '/api/admin/submissions'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/kontakt'
    | '/o-nas'
    | '/projekt'
    | '/sitemap.xml'
    | '/warsztaty'
    | '/zespol'
    | '/api/contact'
    | '/api/admin/login'
    | '/api/admin/logout'
    | '/api/admin/session'
    | '/api/admin/submissions'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRoute
  KontaktRoute: typeof KontaktRoute
  ONasRoute: typeof ONasRoute
  ProjektRoute: typeof ProjektRoute
  SitemapDotxmlRoute: typeof SitemapDotxmlRoute
  WarsztatyRoute: typeof WarsztatyRoute
  ZespolRoute: typeof ZespolRoute
  ApiContactRoute: typeof ApiContactRoute
  ApiAdminLoginRoute: typeof ApiAdminLoginRoute
  ApiAdminLogoutRoute: typeof ApiAdminLogoutRoute
  ApiAdminSessionRoute: typeof ApiAdminSessionRoute
  ApiAdminSubmissionsRoute: typeof ApiAdminSubmissionsRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/zespol': {
      id: '/zespol'
      path: '/zespol'
      fullPath: '/zespol'
      preLoaderRoute: typeof ZespolRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/warsztaty': {
      id: '/warsztaty'
      path: '/warsztaty'
      fullPath: '/warsztaty'
      preLoaderRoute: typeof WarsztatyRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/sitemap.xml': {
      id: '/sitemap.xml'
      path: '/sitemap.xml'
      fullPath: '/sitemap.xml'
      preLoaderRoute: typeof SitemapDotxmlRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/projekt': {
      id: '/projekt'
      path: '/projekt'
      fullPath: '/projekt'
      preLoaderRoute: typeof ProjektRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/o-nas': {
      id: '/o-nas'
      path: '/o-nas'
      fullPath: '/o-nas'
      preLoaderRoute: typeof ONasRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/kontakt': {
      id: '/kontakt'
      path: '/kontakt'
      fullPath: '/kontakt'
      preLoaderRoute: typeof KontaktRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/contact': {
      id: '/api/contact'
      path: '/api/contact'
      fullPath: '/api/contact'
      preLoaderRoute: typeof ApiContactRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/admin/submissions': {
      id: '/api/admin/submissions'
      path: '/api/admin/submissions'
      fullPath: '/api/admin/submissions'
      preLoaderRoute: typeof ApiAdminSubmissionsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/admin/session': {
      id: '/api/admin/session'
      path: '/api/admin/session'
      fullPath: '/api/admin/session'
      preLoaderRoute: typeof ApiAdminSessionRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/admin/logout': {
      id: '/api/admin/logout'
      path: '/api/admin/logout'
      fullPath: '/api/admin/logout'
      preLoaderRoute: typeof ApiAdminLogoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/admin/login': {
      id: '/api/admin/login'
      path: '/api/admin/login'
      fullPath: '/api/admin/login'
      preLoaderRoute: typeof ApiAdminLoginRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRoute,
  KontaktRoute: KontaktRoute,
  ONasRoute: ONasRoute,
  ProjektRoute: ProjektRoute,
  SitemapDotxmlRoute: SitemapDotxmlRoute,
  WarsztatyRoute: WarsztatyRoute,
  ZespolRoute: ZespolRoute,
  ApiContactRoute: ApiContactRoute,
  ApiAdminLoginRoute: ApiAdminLoginRoute,
  ApiAdminLogoutRoute: ApiAdminLogoutRoute,
  ApiAdminSessionRoute: ApiAdminSessionRoute,
  ApiAdminSubmissionsRoute: ApiAdminSubmissionsRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}

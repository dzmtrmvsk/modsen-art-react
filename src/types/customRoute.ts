import { FC } from 'react'

export interface RouteLink {
  label: string
  icon: string
}

export interface RouteConfig {
  path: string
  element: FC
  navigation: RouteLink
  resolvePath: () => string
  generatePath: (..._args: any[]) => string
}

export interface RoutesType {
  home: RouteConfig
  info: RouteConfig & { generatePath: (_id: number | string) => string }
  favorites: RouteConfig
  fallback: RouteConfig
}

/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC } from 'react'

type RouteLink = {
  label: string
  icon: string
} | null

type RouteConfig = {
  path: string
  element: FC
  navigation: RouteLink
  resolvePath: () => string
  generatePath: (..._args: any[]) => string
}

export type RoutesType = {
  home: RouteConfig
  info: RouteConfig & { generatePath: (_id: number | string) => string }
  favorites: RouteConfig
  fallback: RouteConfig
}

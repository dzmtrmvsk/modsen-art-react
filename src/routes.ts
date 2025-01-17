import type { RoutesType } from 'src/types/customRoute'
import markIcon from '@/assets/icons/mark.svg'
import homeIcon from '@/assets/icons/home.svg'
import { FavoritesPage } from '@/pages/Favorites'
import { HomePage } from '@/pages/Home'
import { InfoPage } from '@/pages/Info'
import { NotFoundPage } from '@/pages/NotFound'

export const ROUTE_CONFIG: RoutesType = {
  home: {
    path: '/',
    element: HomePage,
    navigation: {
      label: 'Home',
      icon: homeIcon
    },
    resolvePath() {
      return this.path
    },
    generatePath() {
      return this.path
    }
  },
  info: {
    path: '/info',
    element: InfoPage,
    navigation: null,
    resolvePath() {
      return `${this.path}/:itemId`
    },
    generatePath(itemId: string | number) {
      return `${this.path}/${itemId}`
    }
  },
  favorites: {
    path: '/favorites',
    element: FavoritesPage,
    navigation: {
      label: 'Your favorites',
      icon: markIcon
    },
    resolvePath() {
      return this.path
    },
    generatePath() {
      return this.path
    }
  },
  fallback: {
    path: '*',
    element: NotFoundPage,
    navigation: null,
    resolvePath() {
      return this.path
    },
    generatePath() {
      return this.path
    }
  }
}

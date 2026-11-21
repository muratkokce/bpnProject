import type { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';

export type KliqFamilyRouteName = keyof typeof KliqFamilyRoutes;

export interface KliqFamilyDetailMenuItemsType {
  title: string;
  routeScreen?: KliqFamilyRouteName;
}

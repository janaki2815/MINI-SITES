import { DestinationId } from './destinations.ts';

export interface NavItem {
  id: DestinationId;
  label: string;
  shortLabel: string;
  shortcutKey: string;
  badge?: string;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface NavigationState {
  currentDestination: DestinationId;
  previousDestination: DestinationId | null;
  isDockCollapsed: boolean;
  isInspectorOpen: boolean;
  isContactDrawerOpen: boolean;
}

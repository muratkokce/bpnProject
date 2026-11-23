import React from 'react';

export type TabsMode = 'press' | 'swipe';

export interface TabsItem {
  tabId: string;
  title: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabsItem[];
  mode?: TabsMode;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Rendered below the pager, fixed at the bottom; does not slide with tab transitions. */
  footer?: React.ReactNode;
}

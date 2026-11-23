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
}

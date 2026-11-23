import React from 'react';

import { FlatList, View } from 'react-native';

import type { Tab } from '@/features/family/types/limitAuthority.types';

interface LimitAuthorityListProps {
  items: Tab[];
}

export const LimitAuthorityList: React.FC<LimitAuthorityListProps> = ({ items }) => {
  const renderItem = ({ item }: { item: Tab }) => (
    <View>{/* TODO: Implement permission tab component */}</View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.tabId}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
};

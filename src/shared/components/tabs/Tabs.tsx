import React, { useRef, useState } from 'react';

import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import {
  FooterContainer,
  PageContainer,
  PagerScrollView,
  TabBarContainer,
  TabButton,
  TabItemContent,
  TabsContainer,
} from './styles';
import type { TabsProps } from './types';

const Tabs = ({ items, mode = 'press', initialIndex = 0, onIndexChange, footer }: TabsProps) => {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [containerWidth, setContainerWidth] = useState(0);
  const pagerRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  const updateIndex = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    onIndexChange?.(index);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const handleTabPress = (index: number) => {
    updateIndex(index);
    pagerRef.current?.scrollTo({ x: index * containerWidth, animated: true });
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!containerWidth) return;
    updateIndex(Math.round(event.nativeEvent.contentOffset.x / containerWidth));
  };

  return (
    <TabsContainer onLayout={handleLayout}>
      <TabBarContainer>
        {items.map((item, index) => {
          const selected = index === activeIndex;

          return (
            <TabButton
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              key={item.tabId}
              onPress={mode === 'press' ? () => handleTabPress(index) : undefined}
            >
              <TabItemContent selected={selected}>
                <Text
                  color={selected ? colors.text.primary : colors.text.white}
                  textAlign="center"
                  variant="captionSmallMedium"
                >
                  {item.title}
                </Text>
              </TabItemContent>
            </TabButton>
          );
        })}
      </TabBarContainer>
      <PagerScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleMomentumScrollEnd}
        ref={pagerRef}
        scrollEnabled={mode === 'swipe'}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item) => (
          <PageContainer key={item.tabId} width={containerWidth}>
            {item.content}
          </PageContainer>
        ))}
      </PagerScrollView>
      {footer && <FooterContainer>{footer}</FooterContainer>}
    </TabsContainer>
  );
};

export default Tabs;

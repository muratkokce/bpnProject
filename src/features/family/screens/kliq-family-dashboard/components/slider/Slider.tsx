import React, { useRef, useState } from 'react';

import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import { DotButton, Pagination, SliderContainer, SliderPage, TextContainer } from './styles';

export interface SliderItem {
  title: string;
  description: string;
  icon: React.ComponentType<SvgProps>;
  docIcon?: React.ComponentType<SvgProps>;
}

interface SliderProps {
  items: SliderItem[];
}

export const Slider = ({ items }: SliderProps) => {
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { normalizeSize, colors } = useTheme();

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width > 0) {
      setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width));
    }
  };

  return (
    <SliderContainer onLayout={handleLayout}>
      {width > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleScrollEnd}
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
        >
          {items.map(({ title, description, icon: Icon }) => (
            <SliderPage $width={width} key={title}>
              <Icon height={normalizeSize(200)} width={normalizeSize(280)} />
              {!!items.length && (
                <Pagination>
                  {items.map(({ title: paginationTitle, docIcon: DocIcon }, index) => (
                    <DotButton
                      $active={index === activeIndex}
                      accessibilityLabel={`${index + 1} / ${items.length}`}
                      accessibilityRole="button"
                      accessibilityState={{ selected: index === activeIndex }}
                      key={paginationTitle}
                      onPress={() => {
                        scrollRef.current?.scrollTo({ x: width * index, animated: true });
                        setActiveIndex(index);
                      }}
                    >
                      {DocIcon && (
                        <DocIcon
                          color={index === activeIndex ? colors.background.white : colors.secondary}
                          height={normalizeSize(20)}
                          width={normalizeSize(20)}
                        />
                      )}
                    </DotButton>
                  ))}
                </Pagination>
              )}
              <TextContainer>
                <Text color="textPrimary" variant="titleSmall">
                  {title}
                </Text>
                <Text variant="bodyMedium">{description}</Text>
              </TextContainer>
            </SliderPage>
          ))}
        </ScrollView>
      )}
    </SliderContainer>
  );
};

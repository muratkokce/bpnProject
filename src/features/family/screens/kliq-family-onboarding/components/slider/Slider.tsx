import React, { forwardRef, useRef, useState, useMemo, useCallback } from 'react';

import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import {
  Badge,
  DotButton,
  HighlightBox,
  Pagination,
  SliderContainer,
  SliderPage,
  InfoContainer,
} from './styles';
import { SliderProps } from './types';

type SliderScrollView = React.ElementRef<typeof ScrollView>;

export const Slider = forwardRef<SliderScrollView, SliderProps>(
  ({ items, initialWidth, onSlideChange, onWidthChange }, ref) => {
    const internalRef = useRef<SliderScrollView>(null);
    const [width, setWidth] = useState(initialWidth);
    const [activeIndex, setActiveIndex] = useState(0);
    const { normalizeSize, colors } = useTheme();

    const scrollRef = ref || internalRef;

    const handleLayout = (event: LayoutChangeEvent) => {
      const layoutWidth = event.nativeEvent.layout.width;
      setWidth(layoutWidth);
      onWidthChange?.(layoutWidth);
    };

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (width > 0) {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(newIndex);
        onSlideChange?.(newIndex);
      }
    };

    const handleDotPress = useCallback(
      (index: number) => {
        if (scrollRef && 'current' in scrollRef) {
          scrollRef.current?.scrollTo({ x: width * index, animated: true });
        }
        setActiveIndex(index);
        onSlideChange?.(index);
      },
      [width, scrollRef, onSlideChange]
    );

    const slides = useMemo(
      () =>
        items.map(({ id, badgeText, title, description, highlightBox, icon: Icon }) => (
          <SliderPage $width={width} key={id}>
            {Icon && <Icon height={normalizeSize(200)} width={normalizeSize(280)} />}
            {!!items.length && (
              <Pagination>
                {items.map(({ id: itemId, docIcon: PaginationIcon }, index) => (
                  <DotButton
                    $active={index === activeIndex}
                    accessibilityLabel={`${index + 1} / ${items.length}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: index === activeIndex }}
                    key={itemId}
                    onPress={() => handleDotPress(index)}
                  >
                    {PaginationIcon && (
                      <PaginationIcon
                        color={index === activeIndex ? colors.background.white : colors.secondary}
                        height={normalizeSize(20)}
                        width={normalizeSize(20)}
                      />
                    )}
                  </DotButton>
                ))}
              </Pagination>
            )}
            <InfoContainer>
              <Badge>
                <Text variant="captionBold">{badgeText}</Text>
              </Badge>
              <Text variant="titleSmall">{title}</Text>
              <Text variant="bodyMedium">{description}</Text>
              <HighlightBox>
                <Text variant="captionRegular">{highlightBox.text}</Text>
              </HighlightBox>
            </InfoContainer>
          </SliderPage>
        )),
      [items, activeIndex, width, normalizeSize, colors, handleDotPress]
    );

    return (
      <SliderContainer onLayout={handleLayout}>
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleScrollEnd}
          ref={scrollRef as React.Ref<SliderScrollView>}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {slides}
        </ScrollView>
      </SliderContainer>
    );
  }
);

Slider.displayName = 'Slider';

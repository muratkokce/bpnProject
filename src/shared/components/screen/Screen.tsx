import React from 'react';

import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '@/assets/theme';

import { Button } from '../button';

import {
  ButtonContainer,
  ButtonGradient,
  LoadingContainer,
  ScreenContainer,
  ScreenContent,
  ScreenScrollView,
} from './styles';
import { ScreenProps } from './types';

const Screen = React.forwardRef<any, ScreenProps>(
  (
    {
      children,
      isScreenLoading = false,
      primaryButton,
      footerComponent,
      scrollable = true,
      loadingIndicatorColor,
      buttonContainerStyle,
      buttonContainerBackground,
      contentContainerStyle,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    if (isScreenLoading) {
      return (
        <ScreenContainer insetBottom={insets.bottom} insetTop={insets.top} ref={ref} {...props}>
          <LoadingContainer>
            <ActivityIndicator color={loadingIndicatorColor || colors.primary500} size="large" />
          </LoadingContainer>
        </ScreenContainer>
      );
    }

    const content = scrollable ? (
      <ScreenScrollView
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingBottom: primaryButton ? insets.bottom + 55 : insets.bottom,
          },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScreenScrollView>
    ) : (
      <ScreenContent hasButton={!!primaryButton} insetBottom={insets.bottom}>
        {children}
      </ScreenContent>
    );

    return (
      <ScreenContainer insetBottom={insets.bottom} insetTop={insets.top} ref={ref} {...props}>
        {content}

        {(primaryButton || footerComponent) && (
          <ButtonContainer insetBottom={insets.bottom} style={buttonContainerStyle}>
            <ButtonGradient pointerEvents="none">
              <Svg height="100%" width="100%">
                <Defs>
                  <LinearGradient id="buttonBackgroundGradient" x1="0" x2="0" y1="0" y2="1">
                    <Stop offset="7.08%" stopColor={colors.background.purple} stopOpacity={0} />
                    <Stop
                      offset="26.64%"
                      stopColor={colors.background.purple}
                      stopOpacity={0.642071}
                    />
                    <Stop offset="65.76%" stopColor={colors.background.purple} stopOpacity={1} />
                  </LinearGradient>
                </Defs>
                <Rect fill="url(#buttonBackgroundGradient)" height="100%" width="100%" />
              </Svg>
            </ButtonGradient>
            {buttonContainerBackground}
            {primaryButton && (
              <Button
                backgroundColor={primaryButton.backgroundColor}
                disabled={primaryButton.disabled}
                onPress={primaryButton.onPress}
                text={primaryButton.text}
                textColor={primaryButton.textColor}
                variant={primaryButton.variant}
              />
            )}
            {footerComponent}
          </ButtonContainer>
        )}
      </ScreenContainer>
    );
  }
);

export { Screen };

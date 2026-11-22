import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../button';

import { ButtonBackgroundGradient } from './components/ButtonBackgroundGradient';
import { ButtonContainer, ScreenContainer, ScreenContent, ScreenScrollView } from './styles';
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
      showBottomGradient = false,
      contentContainerStyle,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();

    if (isScreenLoading) {
      return null;
    }

    const hasButtonContainer = primaryButton || footerComponent;

    const content = scrollable ? (
      <ScreenScrollView
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingBottom: hasButtonContainer ? insets.bottom + 55 : insets.bottom,
          },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScreenScrollView>
    ) : (
      <ScreenContent hasButton={!!hasButtonContainer} insetBottom={insets.bottom}>
        {children}
      </ScreenContent>
    );

    return (
      <ScreenContainer insetBottom={insets.bottom} insetTop={insets.top} ref={ref} {...props}>
        {content}

        {hasButtonContainer ? (
          <ButtonContainer insetBottom={insets.bottom} style={buttonContainerStyle}>
            {showBottomGradient && <ButtonBackgroundGradient />}
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
        ) : showBottomGradient ? (
          <ButtonContainer insetBottom={insets.bottom} style={buttonContainerStyle}>
            <ButtonBackgroundGradient />
          </ButtonContainer>
        ) : null}
      </ScreenContainer>
    );
  }
);

export { Screen };

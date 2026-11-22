import React from 'react';

import { Modal } from 'react-native';

import { useTheme } from '@/assets/theme';

import { Button } from '../button';
import { Text } from '../text';

import {
  ModalOverlay,
  ModalContainer,
  IconContainer,
  ContentContainer,
  ButtonsContainer,
} from './styles';
import { InfoModalProps } from './types';

const InfoModal = React.forwardRef<any, InfoModalProps>(
  (
    { visible, onClose, icon, title, description, primaryButton, secondaryButton, ...props },
    ref
  ) => {
    const { normalizeSize } = useTheme();
    return (
      <Modal
        transparent
        animationType="fade"
        onRequestClose={onClose}
        ref={ref}
        visible={visible}
        {...props}
      >
        <ModalOverlay isVisible={visible}>
          <ModalContainer>
            {icon && <IconContainer>{icon}</IconContainer>}
            <ContentContainer>
              <Text style={{ marginBottom: normalizeSize(24) }} variant="titleMedium">
                {title}
              </Text>
              <Text variant="bodyMediumRegular">{description}</Text>
            </ContentContainer>
            <ButtonsContainer>
              <Button
                {...primaryButton}
                text={primaryButton.text}
                variant={primaryButton.variant || 'primary'}
              />
              {secondaryButton && (
                <Button
                  {...secondaryButton}
                  text={secondaryButton.text}
                  variant={secondaryButton.variant || 'secondary'}
                />
              )}
            </ButtonsContainer>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
    );
  }
);

InfoModal.displayName = 'InfoModal';

export { InfoModal };

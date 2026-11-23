import React from 'react';

import { ToggleContainer, ToggleThumb, ToggleTrack } from './styles';
import type { ToggleProps } from './types';

const Toggle = ({ value, onValueChange, disabled }: ToggleProps) => (
  <ToggleContainer
    accessibilityRole="switch"
    accessibilityState={{ checked: value, disabled }}
    disabled={disabled}
    onPress={() => !disabled && onValueChange(!value)}
  >
    <ToggleTrack isEnabled={value}>
      <ToggleThumb isEnabled={value} />
    </ToggleTrack>
  </ToggleContainer>
);

export default Toggle;

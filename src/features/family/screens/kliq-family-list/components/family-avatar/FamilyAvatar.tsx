import { ViewProps } from 'react-native';
import { SvgUri } from 'react-native-svg';

import KliqMiniIcon from '@/assets/icons/kliq-mini.svg';
import { useTheme } from '@/assets/theme';
import { Child } from '@/features/family/types/children.types';
import { Text } from '@/shared/components/text';
import { getNameInitials } from '@/shared/utils';

import { ChildStatus } from '../../constants';
import { AvatarContainer, AvatarStatusContainer } from '../kliq-family-list-items/styles';

interface FamilyAvatarProps {
  child: Child;
  style?: ViewProps['style'];
}

const FamilyAvatar = ({ child, style }: FamilyAvatarProps) => {
  const { colors, normalizeSize } = useTheme();

  return (
    <AvatarContainer style={style}>
      {child.avatarUrl ? (
        <SvgUri height={normalizeSize(40)} uri={child.avatarUrl} width={normalizeSize(40)} />
      ) : (
        <Text color={colors.text.white} variant="bodyBold">
          {getNameInitials(child.fullName)}
        </Text>
      )}
      {child.status === ChildStatus.ACTIVE && (
        <AvatarStatusContainer>
          <KliqMiniIcon height={normalizeSize(7)} width={normalizeSize(6)} />
        </AvatarStatusContainer>
      )}
    </AvatarContainer>
  );
};

export default FamilyAvatar;

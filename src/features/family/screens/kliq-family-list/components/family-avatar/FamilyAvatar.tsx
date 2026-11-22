import { ViewProps } from 'react-native';
import { SvgUri } from 'react-native-svg';

import KliqMiniIcon from '@/assets/icons/kliq-mini.svg';
import UserIcon from '@/assets/icons/user.svg';
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
  const isWaitingApproval = child.status === ChildStatus.AWAITING_APPROVAL;

  const renderAvatar = () => {
    if (isWaitingApproval) {
      return <UserIcon height={normalizeSize(24)} width={normalizeSize(24)} />;
    }
    if (child.avatarUrl) {
      return <SvgUri height={normalizeSize(40)} uri={child.avatarUrl} width={normalizeSize(40)} />;
    }
    return (
      <Text color={colors.text.white} variant="bodyBold">
        {getNameInitials(child.fullName)}
      </Text>
    );
  };

  return (
    <AvatarContainer style={style}>
      {renderAvatar()}
      {child.status === ChildStatus.ACTIVE && (
        <AvatarStatusContainer>
          <KliqMiniIcon height={normalizeSize(7)} width={normalizeSize(6)} />
        </AvatarStatusContainer>
      )}
    </AvatarContainer>
  );
};

export default FamilyAvatar;

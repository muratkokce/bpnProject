import styled from 'styled-components/native';

export const ListItemContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginTop: normalizeSize(16),
    gap: normalizeSize(8),
  })}
`;

export const ItemCard = styled.Pressable`
  ${({ theme: { colors, normalizeSize } }) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalizeSize(16),
    paddingVertical: normalizeSize(12),
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(12),
    marginBottom: normalizeSize(8),
  })}
`;

export const ChildInfoContainer = styled.View`
  ${() => ({
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  })}
`;

export const AvatarContainer = styled.View<{ isWaitingApproval: boolean }>`
  ${({ theme: { colors, normalizeSize }, isWaitingApproval }) => ({
    width: normalizeSize(40),
    height: normalizeSize(40),
    borderRadius: normalizeSize(20),
    backgroundColor: isWaitingApproval ? colors.background.gray : colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalizeSize(12),
    borderWidth: normalizeSize(1.5),
    borderColor: colors.disabled,
  })}
`;

export const AvatarStatusContainer = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    width: normalizeSize(16),
    height: normalizeSize(16),
    borderRadius: normalizeSize(8),
    backgroundColor: colors.primary500,
    marginRight: normalizeSize(12),
    borderWidth: normalizeSize(1.33),
    borderColor: colors.background.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: -normalizeSize(12),
  })}
`;

export const ChildDetailsContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    gap: normalizeSize(4),
    flex: 1,
  })}
`;

export const EmptyStateContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginTop: normalizeSize(16),
  })}
`;

export const AwaitingApprovalStateContainer = styled.View`
  ${({ theme: { normalizeSize, colors } }) => ({
    paddingVertical: normalizeSize(2),
    paddingHorizontal: normalizeSize(4),
    backgroundColor: colors.disabled,
    borderRadius: normalizeSize(4),
    marginHorizontal: normalizeSize(12),
  })}
`;

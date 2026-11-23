import type { Tab } from '@/features/family/types/limitAuthority.types';

import { PermissionsBase } from '../components';

interface CardPermissionsProps {
  tab?: Tab;
  childId?: string;
}

export const CardPermissions: React.FC<CardPermissionsProps> = ({ tab, childId }) => (
  <PermissionsBase childId={childId} tab={tab} />
);

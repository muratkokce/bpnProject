import type { Tab } from '@/features/family/types/limitAuthority.types';

import { PermissionsBase } from '../components';

interface AccountPermissionsProps {
  tab?: Tab;
  childId?: string;
}

export const AccountPermissions: React.FC<AccountPermissionsProps> = ({ tab, childId }) => (
  <PermissionsBase childId={childId} tab={tab} />
);

import BellRingIcon from '@/assets/icons/bell-ring.svg';
import FirstBanner from '@/assets/icons/family-dashboard/first.svg';
import SecondBanner from '@/assets/icons/family-dashboard/second.svg';
import ShieldCheckIcon from '@/assets/icons/shield-check.svg';

import { SliderItem } from './components/slider';

const illustrationKeyMap: Record<string, typeof FirstBanner> = {
  onboarding_family_1: FirstBanner,
  onboarding_tracking_2: SecondBanner,
  onboarding_permissions_3: FirstBanner,
};

const highlightIconMap: Record<string, typeof ShieldCheckIcon> = {
  'shield-check': ShieldCheckIcon,
  'bell-ring': BellRingIcon,
};

export const mapOnboardingItems = (slides: SliderItem[]): SliderItem[] =>
  slides.map((slide) => ({
    ...slide,
    icon: illustrationKeyMap[slide.illustrationKey] || FirstBanner,
    docIcon: highlightIconMap[slide.highlightBox.icon] || ShieldCheckIcon,
  }));

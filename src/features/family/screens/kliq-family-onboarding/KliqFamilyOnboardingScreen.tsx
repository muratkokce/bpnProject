import React, { useRef, useState } from 'react';

import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyFamilyIcon from '@/assets/icons/family-dashboard/empty-family.svg';
import { useTheme } from '@/assets/theme';
import { Slider } from '@/features/family/screens/kliq-family-onboarding/components/slider';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { Text } from '@/shared/components/text';

import { mapOnboardingItems } from './constants';
import { useKliqFamilyOnboarding } from './hooks/useKliqFamilyOnboarding';

const KliqFamilyOnboardingScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyOnboardingScreen>) => {
  const insets = useSafeAreaInsets();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const sliderRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const { data, error, isLoading } = useKliqFamilyOnboarding(attempt);
  const items = mapOnboardingItems(data);

  const { normalizeSize } = useTheme();
  const isLastSlide = activeSlideIndex === items.length - 1;
  const currentSlide = items[activeSlideIndex];

  const handleButtonPress = () => {
    if (error) {
      setAttempt((previousAttempt) => previousAttempt + 1);
      return;
    }
    if (!currentSlide) {
      return;
    }
    if (isLastSlide) {
      navigation.navigate(KliqFamilyRoutes.AddKliqFamilyMemberScreen);
    } else {
      const nextIndex = activeSlideIndex + 1;
      if (sliderWidth > 0) {
        sliderRef.current?.scrollTo({
          x: nextIndex * sliderWidth,
          animated: true,
        });
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Screen
      primaryButton={{
        text: error ? 'Tekrar Dene' : currentSlide?.ctaText || 'Devam Et',
        onPress: handleButtonPress,
        disabled: !error && !currentSlide,
      }}
      style={{ paddingBottom: insets.bottom * 2 }}
    >
      <Slider
        items={items}
        onSlideChange={setActiveSlideIndex}
        onWidthChange={setSliderWidth}
        ref={sliderRef as unknown as React.ComponentProps<typeof Slider>['ref']}
      />
      {error && <Text variant="bodyMedium">Bilgiler yüklenemedi. Lütfen tekrar dene.</Text>}
      <Text style={{ marginVertical: normalizeSize(16) }} variant="captionBold">
        Kliq Ailem
      </Text>

      <InfoCard
        description="Velisi/vasisi olduğun 18 yaşından küçük Kliq Ailem üyeleri burada listelenecek."
        icon={<EmptyFamilyIcon height={normalizeSize(185)} width={normalizeSize(188)} />}
        text="Henüz Aile Üyesi Eklemedin"
      />
    </Screen>
  );
};

export default KliqFamilyOnboardingScreen;

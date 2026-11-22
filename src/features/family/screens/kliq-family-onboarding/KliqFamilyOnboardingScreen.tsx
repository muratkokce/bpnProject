import React, { useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyFamilyIcon from '@/assets/icons/family-dashboard/empty-family.svg';
import { useTheme } from '@/assets/theme';
import { Slider } from '@/features/family/screens/kliq-family-onboarding/components/slider';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { Text } from '@/shared/components/text';
import { showToast } from '@/shared/utils';
import { FAMILY_ONBOARDING_COMPLETED_KEY } from '@/storage';

import { useChildrenData } from '../hooks/useChildrenStore';
import { useKliqFamilyOnboarding } from '../hooks/useKliqFamilyOnboarding';

import { mapOnboardingItems } from './constants';

const KliqFamilyOnboardingScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyOnboardingScreen>) => {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const { normalizeSize } = useTheme();
  const initialSliderWidth = Math.max(0, windowWidth - normalizeSize(48));
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(initialSliderWidth);
  const [attempt, setAttempt] = useState(0);
  const sliderRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const { data, error, isLoading } = useKliqFamilyOnboarding(attempt);
  const { fetchData: fetchChildren } = useChildrenData({ autoFetch: false });
  const items = mapOnboardingItems(data);

  const isLastSlide = activeSlideIndex === items.length - 1;
  const currentSlide = items[activeSlideIndex];

  const handleButtonPress = async () => {
    if (error) {
      setAttempt((previousAttempt) => previousAttempt + 1);
      return;
    }
    if (!currentSlide) {
      return;
    }
    if (isLastSlide) {
      try {
        const childrenData = await fetchChildren();
        const destination =
          childrenData.registeredChildren?.length > 0
            ? KliqFamilyRoutes.KliqFamilyListScreen
            : KliqFamilyRoutes.AddKliqFamilyMemberScreen;

        await AsyncStorage.setItem(FAMILY_ONBOARDING_COMPLETED_KEY, 'true');
        navigation.replace(destination);
      } catch (err) {
        showToast({ message: 'İşlem tamamlanamadı. Lütfen tekrar dene.', type: 'error' });
      }
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

  return (
    <Screen
      showBottomGradient
      isScreenLoading={isLoading}
      primaryButton={{
        text: error ? 'Tekrar Dene' : currentSlide?.ctaText || 'Devam Et',
        onPress: handleButtonPress,
        disabled: !error && !currentSlide,
      }}
      style={{ paddingBottom: insets.bottom * 2 }}
    >
      <Slider
        initialWidth={initialSliderWidth}
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

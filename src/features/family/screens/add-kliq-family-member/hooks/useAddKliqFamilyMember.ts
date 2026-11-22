import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { RootRoutes, TabRoutes } from '@/app/navigation/routes';
import { useChildrenStore } from '@/core/store/childrenStore';
import { useLoadingStore } from '@/core/store/loadingStore';
import type { AvailableChild } from '@/features/family/types/children.types';
import { maskIdentityNumber, showToast } from '@/shared/utils';

import { addKliqFamilyMemberSchema, type AddKliqFamilyMemberForm } from '../schema';
import { createRegisteredChild } from '../utils';

const LOAD_TIMEOUT = 600;

export const useAddKliqFamilyMember = (
  navigation: FamilyScreenProps<typeof KliqFamilyRoutes.AddKliqFamilyMemberScreen>['navigation']
) => {
  const { setLoading } = useLoadingStore();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [matchedChild, setMatchedChild] = useState<AvailableChild | null>(null);
  const { control, handleSubmit, formState, getValues } = useForm<AddKliqFamilyMemberForm>({
    defaultValues: {
      countryCode: '+90',
      phone: '',
      //success
      tckn: '78900000512',
      //error
      // tckn: '32100000678',
      // tckn: '65400000904',
    },
    resolver: zodResolver(addKliqFamilyMemberSchema),
    mode: 'onTouched',
  });

  const navigateToAccountsTab = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: RootRoutes.MainTabs, params: { screen: TabRoutes.Accounts } }],
    });
  };

  const navigateToBack = () => {
    navigation.popTo(KliqFamilyRoutes.KliqFamilyListScreen);
  };

  const onSubmit = async () => {
    const tckn = getValues('tckn');
    const maskedFormTckn = maskIdentityNumber(tckn);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const { data: childrenData, setData } = useChildrenStore.getState();
      if (
        childrenData?.registeredChildren.some(
          (child) => child.maskedIdentityNumber === maskedFormTckn
        )
      ) {
        showToast({
          message: 'Bu T.C. kimlik numarası ile kayıtlı bir aile üyesi var.',
          type: 'info',
        });
        return;
      }

      if (childrenData?.availableToAddChildren) {
        const matched = childrenData.availableToAddChildren.find(
          (child) => child.maskedIdentityNumber === maskedFormTckn
        );

        if (matched) {
          if (matched.verificationScenario === 'SUCCESS') {
            setData({
              ...childrenData,
              registeredChildren: childrenData.registeredChildren.some(
                (child) => child.id === matched.id
              )
                ? childrenData.registeredChildren
                : [...childrenData.registeredChildren, createRegisteredChild(matched)],
              availableToAddChildren: childrenData.availableToAddChildren.filter(
                (child) => child.id !== matched.id
              ),
            });
          }
          setMatchedChild(matched);
          setIsConfirmModalVisible(true);
        }
      }
    }, LOAD_TIMEOUT);
  };

  const handlePrimaryButtonPress = () => {
    setIsConfirmModalVisible(false);

    if (matchedChild?.expectedModal.type === 'SUCCESS') {
      navigateToBack();
    }
  };

  const handleSecondaryButtonPress = () => {
    setIsConfirmModalVisible(false);

    if (matchedChild?.expectedModal.type === 'SUCCESS') {
      if (matchedChild?.expectedModal.secondaryButtonText) {
        navigateToAccountsTab();
      }
    } else {
      if (matchedChild?.expectedModal.secondaryButtonText) {
        navigateToBack();
      }
    }
  };

  return {
    control,
    formState,
    handleSubmit,
    onSubmit,
    isConfirmModalVisible,
    matchedChild,
    handlePrimaryButtonPress,
    handleSecondaryButtonPress,
  };
};

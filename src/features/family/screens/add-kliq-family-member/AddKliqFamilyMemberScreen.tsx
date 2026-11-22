import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { RootRoutes, TabRoutes } from '@/app/navigation/routes';
import FailIcon from '@/assets/icons/info/fail.svg';
import SuccessIcon from '@/assets/icons/info/success.svg';
import { useTheme } from '@/assets/theme';
import { useChildrenStore } from '@/core/store/childrenStore';
import { useLoadingStore } from '@/core/store/loadingStore';
import { InfoModal } from '@/shared/components/info-modal';
import { PhoneInput } from '@/shared/components/phone-input';
import { Screen } from '@/shared/components/screen';
import { TextInput } from '@/shared/components/text-input';
import { maskIdentityNumber } from '@/shared/utils';

import { addKliqFamilyMemberSchema, type AddKliqFamilyMemberForm } from './schema';

const LOAD_TIMEOUT = 600;

const AddKliqFamilyMemberScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.AddKliqFamilyMemberScreen>) => {
  const { normalizeSize } = useTheme();
  const { data: childrenData } = useChildrenStore();
  const { setLoading } = useLoadingStore();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [matchedChild, setMatchedChild] = useState<any>(null);
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

  const onSubmit = async () => {
    const tckn = getValues('tckn');
    const maskedFormTckn = maskIdentityNumber(tckn);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (childrenData?.availableToAddChildren) {
        const matched = childrenData.availableToAddChildren.find(
          (child) => child.maskedIdentityNumber === maskedFormTckn
        );

        if (matched) {
          setMatchedChild(matched);
          setIsConfirmModalVisible(true);
        }
      }
    }, LOAD_TIMEOUT);
  };

  const handlePrimaryButtonPress = () => {
    setIsConfirmModalVisible(false);

    if (matchedChild?.expectedModal.type === 'SUCCESS') {
      navigation.goBack();
    }
  };

  const handleSecondaryButtonPress = () => {
    setIsConfirmModalVisible(false);

    if (matchedChild?.expectedModal.type === 'SUCCESS') {
      if (matchedChild?.expectedModal.secondaryButtonText) {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: RootRoutes.MainTabs, params: { screen: TabRoutes.Accounts } }],
        });
      }
    } else {
      if (matchedChild?.expectedModal.secondaryButtonText) {
        navigation.goBack();
      }
    }
  };

  return (
    <>
      <Screen
        primaryButton={{
          text: 'Davet Gönder',
          onPress: handleSubmit(onSubmit),
          disabled: !formState.isValid,
        }}
      >
        <PhoneInput
          control={control}
          countryCodeName="countryCode"
          name="phone"
          style={{ marginBottom: normalizeSize(24) }}
        />
        <TextInput control={control} label="T.C. kimlik numarası" name="tckn" type="tckn" />
      </Screen>

      {matchedChild && (
        <InfoModal
          description={matchedChild.expectedModal.message}
          icon={
            matchedChild.expectedModal.type === 'SUCCESS' ? (
              <SuccessIcon height={normalizeSize(200)} width={normalizeSize(200)} />
            ) : (
              <FailIcon height={normalizeSize(200)} width={normalizeSize(200)} />
            )
          }
          onClose={() => setIsConfirmModalVisible(false)}
          primaryButton={{
            text: matchedChild.expectedModal.primaryButtonText,
            onPress: handlePrimaryButtonPress,
            variant: 'primary',
          }}
          secondaryButton={
            matchedChild.expectedModal.secondaryButtonText
              ? {
                  text: matchedChild.expectedModal.secondaryButtonText,
                  onPress: handleSecondaryButtonPress,
                  variant: 'secondary',
                }
              : undefined
          }
          title={matchedChild.expectedModal.title}
          visible={isConfirmModalVisible}
        />
      )}
    </>
  );
};

export default AddKliqFamilyMemberScreen;

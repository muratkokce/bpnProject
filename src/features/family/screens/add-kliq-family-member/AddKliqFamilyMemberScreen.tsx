import React from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import FailIcon from '@/assets/icons/info/fail.svg';
import SuccessIcon from '@/assets/icons/info/success.svg';
import { useTheme } from '@/assets/theme';
import { InfoModal } from '@/shared/components/info-modal';
import { PhoneInput } from '@/shared/components/phone-input';
import { Screen } from '@/shared/components/screen';
import { TextInput } from '@/shared/components/text-input';

import { useAddKliqFamilyMember } from './hooks/useAddKliqFamilyMember';

const AddKliqFamilyMemberScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.AddKliqFamilyMemberScreen>) => {
  const { normalizeSize } = useTheme();
  const {
    control,
    formState,
    handleSubmit,
    onSubmit,
    isConfirmModalVisible,
    matchedChild,
    handlePrimaryButtonPress,
    handleSecondaryButtonPress,
  } = useAddKliqFamilyMember(navigation);

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
          onClose={() => {}}
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

import React from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { Screen } from '@/shared/components/screen';
import { Text } from '@/shared/components/text';

import { styles } from '../styles';

const KliqFamilyDashboardScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyDashboardScreen>) => {
  return (
    <Screen
      primaryButton={{
        text: 'Kliq Aileme Ekle',
        onPress: () => navigation.navigate(KliqFamilyRoutes.AddKliqFamilyMemberScreen),
      }}
    >
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
      <Text style={styles.description}>
        Henüz çocuk eklemediniz. Çocuğunuzu ekleyerek ailenizi burada görüntüleyebilirsiniz.
      </Text>
    </Screen>
  );
};

export default KliqFamilyDashboardScreen;

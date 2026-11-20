import React from 'react';

import { Pressable, ScrollView, View } from 'react-native';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { Text } from '@/shared/components/text';

import { styles } from '../styles';

const KliqFamilyListScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyListScreen>) => {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.listHeader}>
        <Text style={styles.eyebrow}>KLİQ AİLEM</Text>
        <Text style={styles.title}>Çocuklarım</Text>
        <Text style={styles.description}>
          Ailenize eklediğiniz çocukları burada görebilirsiniz.
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate(KliqFamilyRoutes.AddKliqFamilyMemberScreen)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Çocuk Ekle</Text>
      </Pressable>
    </ScrollView>
  );
};

export default KliqFamilyListScreen;

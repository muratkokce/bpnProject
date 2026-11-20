import React from 'react';

import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput } from 'react-native';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { Text } from '@/shared/components/text';

import { styles } from '../styles';

const AddKliqFamilyMemberScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.AddKliqFamilyMemberScreen>) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Çocuk Ekle</Text>
        <Text style={styles.description}>Çocuğunuzun adını girerek ailenize ekleyin.</Text>
        <Text style={styles.label}>Ad ve soyad</Text>
        <TextInput
          accessibilityLabel="Ad ve soyad"
          autoCapitalize="words"
          placeholder="Ad ve soyad"
          placeholderTextColor="#8A9793"
          returnKeyType="done"
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate(KliqFamilyRoutes.KliqFamilyListScreen)}
          style={[styles.button, styles.formButton]}
        >
          <Text style={styles.buttonText}>Listeyi Gör</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddKliqFamilyMemberScreen;

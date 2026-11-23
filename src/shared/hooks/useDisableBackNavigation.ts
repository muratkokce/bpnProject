import { useCallback, useRef } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const getNavigationChain = (navigation: NavigationProp<ParamListBase>) => {
  const chain: NavigationProp<ParamListBase>[] = [];
  let current: NavigationProp<ParamListBase> | undefined = navigation;

  while (current) {
    chain.push(current);
    current = current.getParent();
  }

  return chain;
};

const useDisableBackNavigation = (enabled = true, onBackPress?: () => void) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const onBackPressRef = useRef(onBackPress);
  onBackPressRef.current = onBackPress;
  const bypassGuardRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!enabled) return undefined;
      const chain = getNavigationChain(navigation);
      chain.forEach((nav) => nav.setOptions({ gestureEnabled: false }));

      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
        onBackPressRef.current?.();
        return true;
      });

      const removeBeforeRemoveListener = navigation.addListener('beforeRemove', (event) => {
        if (bypassGuardRef.current) return;

        event.preventDefault();
        onBackPressRef.current?.();
      });

      return () => {
        backHandlerSubscription.remove();
        removeBeforeRemoveListener();
        chain.forEach((nav) => nav.setOptions({ gestureEnabled: undefined }));
      };
    }, [navigation, enabled])
  );

  const goBack = useCallback(() => {
    bypassGuardRef.current = true;
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    bypassGuardRef.current = false;
  }, [navigation]);

  return { goBack };
};

export { useDisableBackNavigation };

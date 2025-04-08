import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';

import {productStore} from '../stores/ProductStore';
import {cartStore} from '../stores/CartStore';
import {ProductList} from '../components/ProductList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ShopScreen = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Shop'>>();

  const {bottom} = useSafeAreaInsets();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const {totalItems} = cartStore;

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <ProductList products={productStore.products} />
      <View style={styles.footer}>
        <Button
          title={
            totalItems > 0
              ? `Перейти к оформлению (${totalItems})`
              : 'Корзина пуста'
          }
          onPress={handleCheckout}
          disabled={totalItems === 0}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  footer: {
    marginVertical: 16,
  },
});

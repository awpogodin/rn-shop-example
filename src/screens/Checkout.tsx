import React, {useState} from 'react';
import {View, Text, Button, Alert, ScrollView, StyleSheet} from 'react-native';
import {cartStore} from '../stores/CartStore';
import {observer} from 'mobx-react-lite';
import {submitOrder} from '../services/orderService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CartList} from '../components/CartList';
import {OptionList} from '../components/OptionList';

export const CheckoutScreen = observer(() => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {bottom} = useSafeAreaInsets();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await submitOrder({
        items: cartStore.cart,
        options: cartStore.options,
      });
      Alert.alert('Успешно', 'Заказ оформлен');
    } catch (e: any) {
      Alert.alert('Ошибка', e?.message ?? 'Произошла ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <ScrollView>
        <CartList />
        <OptionList disabled={isSubmitting} />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.title}>Итого: {cartStore.totalPrice}р</Text>

        <Button
          title="Подтвердить заказ"
          onPress={handleSubmit}
          disabled={cartStore.totalPrice < 1000 || isSubmitting}
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
  title: {fontWeight: 'bold', fontSize: 18, marginVertical: 8},
  footer: {
    marginVertical: 16,
    gap: 8,
  },
});

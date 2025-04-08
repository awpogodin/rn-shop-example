import {observer} from 'mobx-react-lite';
import {StyleSheet, Text, View} from 'react-native';
import {productStore} from '../stores/ProductStore';
import {cartStore} from '../stores/CartStore';
import {formatPrice} from '../utils/formatPrice';

export const CartList = observer(() => {
  const items = cartStore.cart;

  if (!items.length) {
    // TODO: Добавить состояние, когда список пустой?
    return null;
  }

  return (
    <>
      <Text style={styles.title}>Товары в корзине:</Text>
      {items.map(item => {
        const product = productStore.getById(item.productId);
        if (!product) {
          return null;
        }

        return (
          <View key={item.productId} style={styles.cartItem}>
            <Text>{product.name}</Text>
            <Text>
              {`${item.quantity} шт. × ${formatPrice(
                product.price,
              )} = ${formatPrice(product.price * item.quantity)}`}
            </Text>
          </View>
        );
      })}
    </>
  );
});

const styles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 18, marginVertical: 8},
  cartItem: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

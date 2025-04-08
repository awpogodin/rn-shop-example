import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Product} from '../models/Product';
import {cartStore} from '../stores/CartStore';
import {observer} from 'mobx-react-lite';
import {formatPrice} from '../utils/formatPrice';

type Props = {
  product: Product;
};

export const ProductListItem = observer(({product}: Props) => {
  const cartItem = cartStore.getByProductId(product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <View style={styles.container}>
      <View>
        <Text>{product.name}</Text>
        <Text>{formatPrice(product.price)}</Text>
        <Text>В наличии: {product.quantityAvailable}</Text>
      </View>

      {quantity > 0 ? (
        <View style={styles.buttonsBlock}>
          <Button
            title="−"
            onPress={() => cartStore.decreaseQuantity(product.id)}
          />
          <Text style={styles.quantityText}>{quantity}</Text>
          <Button
            title="+"
            onPress={() => cartStore.addToCart(product.id)}
            disabled={quantity >= product.quantityAvailable}
          />
        </View>
      ) : (
        <Button
          title="Добавить в корзину"
          onPress={() => cartStore.addToCart(product.id)}
          disabled={quantity >= product.quantityAvailable}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#21212120',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityText: {
    marginHorizontal: 8,
  },
});

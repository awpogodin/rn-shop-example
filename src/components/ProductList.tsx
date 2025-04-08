import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {Product} from '../models/Product';
import {ProductListItem} from './ProductListItem';

type Props = {
  products: Product[];
};

export const ProductList = ({products}: Props) => {
  const renderItem: ListRenderItem<Product> = ({item}) => (
    <ProductListItem product={item} />
  );

  return (
    <FlatList<Product>
      data={products}
      keyExtractor={item => item.id}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={10}
      renderItem={renderItem}
    />
  );
};

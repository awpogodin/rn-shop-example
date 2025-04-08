import {observer} from 'mobx-react-lite';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {cartStore} from '../stores/CartStore';
import {DeliveryOption} from '../models/Cart';

// #region не обращать внимание, решается интернационализацией. Чтобы текстовку можно было получить по ключу
const getOptionName = (option: DeliveryOption): string | null => {
  if (option === 'leaveAtDoor') {
    return 'Оставить у двери';
  }
  if (option === 'noContact') {
    return 'Не звонить';
  }
  return null;
};
// #endregion

type Props = {
  disabled?: boolean;
};

export const OptionList = observer(({disabled}: Props) => {
  if (!cartStore.cart.length) {
    return null;
  }
  return (
    <>
      <Text style={styles.title}>Опции:</Text>
      <View>
        {cartStore.availableOptions.map(opt => {
          const optionName = getOptionName(opt);
          if (!optionName) {
            return null;
          }
          return (
            <Pressable
              key={opt}
              onPress={() => cartStore.toggleOption(opt)}
              disabled={disabled}>
              <View
                key={opt}
                style={[styles.optionItem, disabled && styles.disabled]}>
                <Text>
                  {cartStore.options.includes(opt)
                    ? `✓ ${optionName}`
                    : optionName}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 18, marginVertical: 8},
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

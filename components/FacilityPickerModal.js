import { Modal, View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import Sticker from './Sticker';
import Button from './Button';
import facilities from '../data/facilities.json';
import { theme } from '../theme';

export default function FacilityPickerModal({ visible, onClose, onSelect }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Sticker label="SELECT DEPOT" color={theme.colors.yellow} rotate={theme.rotation.slightNeg} />
            <Text style={styles.title}>Pick Drop-off Facility</Text>
            <Text style={styles.subtitle}>Choose where you are dropping off your device.</Text>
          </View>

          <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            {facilities.map((facility) => (
              <Pressable
                key={facility.id}
                style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
                onPress={() => onSelect(facility)}
              >
                <Text style={styles.itemName}>{facility.name}</Text>
                <Text style={styles.itemAddress}>{facility.address}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Button title="Cancel" variant="ghost" onPress={onClose} style={styles.cancelBtn} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radii.card,
    borderTopRightRadius: theme.radii.card,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    padding: theme.spacing.xl,
    maxHeight: '75%',
    gap: theme.spacing.md,
  },
  header: { gap: theme.spacing.xs },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.black,
  },
  subtitle: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    color: theme.colors.greyDark,
  },
  list: { maxHeight: 320 },
  listContent: { gap: theme.spacing.sm, paddingVertical: theme.spacing.xs },
  item: {
    backgroundColor: theme.colors.greyLight,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  itemPressed: { backgroundColor: theme.colors.mint },
  itemName: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.black,
  },
  itemAddress: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.xs,
    color: theme.colors.greyDark,
  },
  cancelBtn: { marginTop: theme.spacing.xs },
});

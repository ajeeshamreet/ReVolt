import { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sticker from '../../components/Sticker';
import HazardCard from '../../components/HazardCard';
import HazardDetailModal from '../../components/HazardDetailModal';
import { hazards } from '../../data/hazards';
import { theme } from '../../theme';

export default function LearnScreen() {
  const [selectedHazard, setSelectedHazard] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Sticker
            label="ACADEMY"
            color={theme.colors.yellow}
            rotate={theme.rotation.slightNeg}
          />
          <Text style={styles.heading}>Knowledge is power</Text>
          <Text style={styles.subheading}>
            Understand hazardous elements inside electronics and why responsible recycling matters.
          </Text>
        </View>

        <View style={styles.list}>
          {hazards.map((item) => (
            <HazardCard
              key={item.id}
              item={item}
              onPress={() => setSelectedHazard(item)}
            />
          ))}
        </View>
      </ScrollView>

      <HazardDetailModal
        hazard={selectedHazard}
        visible={Boolean(selectedHazard)}
        onClose={() => setSelectedHazard(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgPink,
  },
  container: {
    padding: theme.spacing.xl,
    gap: theme.spacing.xl,
    paddingBottom: theme.spacing.huge,
  },
  header: {
    gap: theme.spacing.sm,
  },
  heading: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.lineHeight.xxl,
    color: theme.colors.black,
  },
  subheading: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.greyDark,
  },
  list: {
    gap: theme.spacing.lg,
  },
});

import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Sticker from '../../components/Sticker';
import DeviceCard from '../../components/DeviceCard';
import RecycleCalculator from '../../components/RecycleCalculator';
import { devices } from '../../data/devices';
import { theme } from '../../theme';

export default function RecycleScreen() {
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [condition, setCondition] = useState('working');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Sticker
            label="CALCULATOR"
            color={theme.colors.yellow}
            rotate={theme.rotation.slightNeg}
          />
          <Text style={styles.heading}>What are you recycling?</Text>
          <Text style={styles.subheading}>
            Select your electronics to calculate recovered metals and points.
          </Text>
        </View>

        <View style={styles.grid}>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              isSelected={selectedDevice?.id === device.id}
              onSelect={() => setSelectedDevice(device)}
            />
          ))}
        </View>

        {selectedDevice && (
          <RecycleCalculator
            device={selectedDevice}
            condition={condition}
            onConditionChange={setCondition}
            onNavigateMap={() => router.navigate('/')}
          />
        )}
      </ScrollView>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.spacing.md,
  },
});

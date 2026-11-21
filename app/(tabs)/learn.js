import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import Sticker from '../../components/Sticker';
import Blob from '../../components/Blob';
import Button from '../../components/Button';
import { theme } from '../../theme';

export default function LearnScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Learn</Text>
        <Text style={styles.subheading}>Previewing our design language</Text>

        <Card color={theme.colors.lilac} style={styles.card}>
          <View style={styles.blobAnchor}>
            <Blob color={theme.colors.mint} size={theme.blobSize.md} />
          </View>
          <Sticker label="5 MIN READ" color={theme.colors.yellow} />
          <Text style={styles.cardTitle}>Why E-Waste Matters</Text>
          <Text style={styles.bodyText}>
            Discarded electronics release toxic chemicals into the soil and water. Learn how
            responsible recycling keeps heavy metals safe.
          </Text>
          <View style={styles.buttonRow}>
            <Button title="Start Reading" style={styles.button} />
            <Button title="Save" variant="ghost" style={styles.button} />
          </View>
        </Card>

        <Card color={theme.colors.pink} style={styles.card}>
          <Sticker
            label="QUICK TIP"
            color={theme.colors.mint}
            rotate={theme.rotation.slightPos}
          />
          <Text style={styles.cardTitle}>Lithium Batteries</Text>
          <Text style={styles.bodyText}>
            Never throw swollen batteries into domestic bins. Tape the terminals before dropping
            them at a certified facility.
          </Text>
        </Card>
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
  },
  heading: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.lineHeight.xxl,
    color: theme.colors.black,
  },
  subheading: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.md,
    lineHeight: theme.lineHeight.md,
    color: theme.colors.greyDark,
    marginTop: -theme.spacing.sm,
  },
  card: {
    gap: theme.spacing.md,
  },
  blobAnchor: {
    position: 'absolute',
    top: -theme.spacing.lg,
    right: -theme.spacing.lg,
  },
  cardTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.black,
  },
  bodyText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  button: {
    flex: 1,
  },
});

import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sticker from '../../components/Sticker';
import WalletHeroCard from '../../components/WalletHeroCard';
import WalletHistoryRow from '../../components/WalletHistoryRow';
import WalletEmptyState from '../../components/WalletEmptyState';
import { useWallet } from '../../lib/useWallet';
import { theme } from '../../theme';

export default function WalletScreen() {
  const { points, history } = useWallet();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Sticker
            label="IMPACT WALLET"
            color={theme.colors.yellow}
            rotate={theme.rotation.slightNeg}
          />
          <Text style={styles.heading}>Your Eco Wallet</Text>
          <Text style={styles.subheading}>
            Track points earned from responsible electronics drop-offs.
          </Text>
        </View>

        <WalletHeroCard points={points} count={history.length} />

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>
            DROP-OFF HISTORY ({history.length})
          </Text>
          {history.length === 0 ? (
            <WalletEmptyState />
          ) : (
            <View style={styles.historyList}>
              {history.map((item, index) => (
                <WalletHistoryRow key={item.id || index} item={item} index={index} />
              ))}
            </View>
          )}
        </View>
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
  historySection: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.greyDark,
    letterSpacing: 0.5,
  },
  historyList: {
    gap: theme.spacing.sm,
  },
});

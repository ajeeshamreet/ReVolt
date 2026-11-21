import { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Sticker from './Sticker';
import Button from './Button';
import NeoPill from './NeoPill';
import OnboardingBackdrop from './OnboardingBackdrop';
import { ONBOARDING_SLIDES } from '../data/onboarding';
import { theme } from '../theme';

const NEVER_SHOW_KEY = '@revolt_onboarding_never_show';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingModal() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function check() {
      try {
        const neverShow = await AsyncStorage.getItem(NEVER_SHOW_KEY);
        if (neverShow !== 'true') setVisible(true);
      } catch (e) {
        setVisible(true);
      }
    }
    check();
  }, []);

  const handleDontShowAgain = async () => {
    try { await AsyncStorage.setItem(NEVER_SHOW_KEY, 'true'); } catch (e) {}
    setVisible(false);
  };

  const isLast = activeIndex === ONBOARDING_SLIDES.length - 1;
  const handleNextOrHome = () => {
    if (isLast) setVisible(false);
    else scrollRef.current?.scrollTo({ x: (activeIndex + 1) * SCREEN_WIDTH, animated: true });
  };

  if (!visible) return null;
  const currentSlide = ONBOARDING_SLIDES[activeIndex];

  return (
    <Modal visible={visible} animationType="fade">
      <SafeAreaView style={[styles.container, { backgroundColor: currentSlide.color }]}>
        <OnboardingBackdrop shapeType={currentSlide.shapeType} />
        <View style={styles.topBar}>
          {!isLast && <NeoPill title="Home" onPress={() => setVisible(false)} />}
        </View>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH))}
        >
          {ONBOARDING_SLIDES.map((slide, i) => (
            <View key={slide.key} style={[styles.slide, { width: SCREEN_WIDTH }]}>
              <View style={[styles.iconBox, i === 1 && styles.iconBoxSquircle, i === 2 && styles.iconBoxTilted]}>
                <Ionicons name={slide.icon} size={theme.iconSize.lg} color={theme.colors.black} />
              </View>
              <Sticker label={slide.step} color={theme.colors.white} rotate={theme.rotation.slightNeg} />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.desc}>{slide.desc}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.dots}>
            {ONBOARDING_SLIDES.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
            ))}
          </View>
          <View style={styles.buttons}>
            <Button title="Don't show again" variant="ghost" onPress={handleDontShowAgain} style={styles.flexBtn} textStyle={styles.btnTextSmall} />
            {isLast ? (
              <NeoPill title="Home" onPress={() => setVisible(false)} style={styles.flexBtn} />
            ) : (
              <Button title="Next" onPress={handleNextOrHome} style={styles.flexBtn} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.md, minHeight: 48 },
  slide: { flex: 1, padding: theme.spacing.xxxl, justifyContent: 'center', gap: theme.spacing.lg },
  iconBox: { width: 68, height: 68, borderRadius: theme.radii.pill, backgroundColor: theme.colors.white, borderWidth: theme.borderWidth.card, borderColor: theme.colors.black, alignItems: 'center', justifyContent: 'center' },
  iconBoxSquircle: { borderRadius: theme.radii.lg },
  iconBoxTilted: { borderRadius: theme.radii.card, transform: [{ rotate: theme.rotation.slightPos }] },
  title: { fontFamily: theme.fonts.heading, fontSize: theme.fontSize.xxl, lineHeight: theme.lineHeight.xxl, color: theme.colors.black },
  desc: { fontFamily: theme.fonts.body, fontSize: theme.fontSize.md, lineHeight: theme.lineHeight.md, color: theme.colors.black },
  footer: { padding: theme.spacing.xl, gap: theme.spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: theme.spacing.sm },
  dot: { width: 10, height: 10, borderRadius: theme.radii.pill, backgroundColor: 'rgba(0,0,0,0.2)' },
  activeDot: { width: 24, backgroundColor: theme.colors.black },
  buttons: { flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' },
  flexBtn: { flex: 1 },
  btnTextSmall: { fontSize: theme.fontSize.xs, lineHeight: theme.lineHeight.xs },
});

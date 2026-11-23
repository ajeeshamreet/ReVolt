import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { MAP_HTML } from '../lib/mapHtml';
import { theme } from '../theme';

const OpenFreeMapView = forwardRef(function OpenFreeMapView(
  { userPoint, facilities, selectedFacility, selectedId, onSelectFacility, onDeselect },
  ref
) {
  const webViewRef = useRef(null);
  const isLoadedRef = useRef(false);

  const postUpdate = () => {
    if (!isLoadedRef.current) return;
    const payload = JSON.stringify({
      userPoint,
      facilities,
      selectedFacility,
      selectedId,
    });
    webViewRef.current?.injectJavaScript(`window.updateMap && window.updateMap(${payload}); true;`);
  };

  useEffect(() => {
    postUpdate();
  }, [userPoint, facilities, selectedFacility, selectedId]);

  useImperativeHandle(ref, () => ({
    flyTo: (lng, lat, zoom = 12) => {
      webViewRef.current?.injectJavaScript(`window.flyTo && window.flyTo(${lng}, ${lat}, ${zoom}); true;`);
    },
  }));

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'SELECT_FACILITY') {
        onSelectFacility?.(data.id);
      } else if (data.type === 'DESELECT') {
        onDeselect?.();
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: MAP_HTML }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit={false}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        onLoadEnd={() => {
          isLoadedRef.current = true;
          postUpdate();
        }}
        onMessage={handleMessage}
      />
    </View>
  );
});

export default OpenFreeMapView;

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', backgroundColor: theme.colors.greyLight },
  webview: { flex: 1, backgroundColor: theme.colors.transparent },
});

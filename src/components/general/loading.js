import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
const Loading = () => (
  <SafeAreaView style={{justifyContent: 'center', flex: 1}}>
    <ActivityIndicator  style={{textAlign: 'center'}} size="large" color="#0000ff" />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loading;
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import supabase from '@/components/supabase';
import { RootParamList } from '../navigation/types';

const IndexScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    route.params?.setIsSignedIn(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ThemedView style={styles.landingContainer}>
          <ThemedText type="title" style={styles.welcomeText}>
            Welcome User!
          </ThemedText>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleLogout}
          >
            <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#243B55',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 25,
    justifyContent: 'center',
  },
  landingContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexScreen;
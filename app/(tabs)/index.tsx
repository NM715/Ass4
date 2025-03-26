import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Pressable, Alert, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import supabase from '@/components/supabase';
import { RootParamList } from '../navigation/types';

const IndexScreen = () => {
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'Home'>>();

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
     
      const newAccountCreated = route.params?.newAccount;
      if (newAccountCreated) {
        setIsNewAccount(true);
      }

     
      const { data: { user } } = await supabase.auth.getUser();
      
     
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('user_id', user?.id)
        .single();

      if (profile) {
        setFirstName(profile.first_name || '');
        setLastName(profile.last_name || '');
      }
    } else {
      
      navigation.navigate('Signin');
    }
  };

  const handleContinue = () => {
    setIsNewAccount(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      navigation.navigate('Signin');
    }
  };

  if (isNewAccount) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <ThemedView style={styles.congratsContainer}>
            <Text style={styles.congratsTitle}>Congratulations!</Text>
            <Text style={styles.congratsText}>Your account has been successfully created.</Text>
            
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleContinue}
            >
              <ThemedText style={styles.buttonText}>Continue to Home</ThemedText>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ThemedView style={styles.landingContainer}>
          <Text style={styles.welcomeText}>Welcome User {firstName} {lastName}!</Text>
          
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
  congratsContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  landingContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  congratsText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexScreen;
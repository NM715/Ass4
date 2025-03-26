import { StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import supabase from '@/components/supabase';
import { useEffect, useState } from 'react';

const IndexScreen = ({ userDetails, setIsSignedIn, setUserDetails }) => {
  const navigation = useNavigation();
  const [localUsername, setLocalUsername] = useState('');

  useEffect(() => {
    if (userDetails) {
      setLocalUsername(`${userDetails.firstName} ${userDetails.lastName}`);
    }
  }, [userDetails]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsSignedIn(false);
      setUserDetails(null);
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ThemedView style={styles.landingContainer}>
          <ThemedText type="title" style={styles.welcomeText}>
            {userDetails ? `Welcome, ${localUsername}!` : 'Welcome Guest!'}
          </ThemedText>

          {userDetails ? (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleLogout}
            >
              <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => navigation.navigate('./SignIn')}
            >
              <ThemedText style={styles.buttonText}>Sign In</ThemedText>
            </Pressable>
          )}
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexScreen;
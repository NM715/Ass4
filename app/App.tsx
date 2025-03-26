import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from './(tabs)/Signin';
import Signup from './(tabs)/Signup';
import IndexScreen from './(tabs)';
import supabase from '@/components/supabase';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true); 
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('user_details')
          .select('first_name, last_name')
          .eq('uuid', user.id)
          .single();

        if (userData) {
          setUserDetails({
            firstName: userData.first_name || '',
            lastName: userData.last_name || '',
          });
          setIsSignedIn(true);
        }
      } else {
        setUserDetails(null);
        setIsSignedIn(false);
      }
      setIsLoading(false); 
    };

    checkSession();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <IndexScreen
              userDetails={userDetails}
              setIsSignedIn={setIsSignedIn}
              setUserDetails={setUserDetails}
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          component={Signin} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

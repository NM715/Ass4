import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import IndexScreen from './(tabs)';
import Signup from './(tabs)/Signup';
import Signin from './(tabs)/Signin';
import supabase from '@/components/supabase';

const Stack = createStackNavigator();

export default function App() {
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

        setUserDetails({
          firstName: userData?.first_name || '',
          lastName: userData?.last_name || ''
        });
        setIsSignedIn(true);
      } else {
        // Set guest user details immediately
        setUserDetails({ firstName: 'Guest', lastName: 'User' });
      }
      setIsLoading(false);
    };
    
    checkSession();
  }, []);

  if (isLoading) {
    return null; // Show loading indicator here if desired
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Always keep Home screen available */}
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <IndexScreen 
              userDetails={userDetails}
              setIsSignedIn={setIsSignedIn}
              setUserDetails={setUserDetails}
            />
          )}
        </Stack.Screen>

        {/* Auth screens */}
        <Stack.Screen 
          name="SignIn" 
          component={Signin} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={Signup} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import WorkOrderScreen from '../screens/WorkOrderScreen';
import PdfViewerScreen from '../screens/PdfViewerScreen'; 
import CameraScreen from '../screens/CameraScreen'; 
import PreviewScreen from '../screens/PreviewScreen'; 
import { getData } from '../utils/storage';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  WorkOrderScreen: { workId: number; productId: number };
  PdfViewerScreen: { pdfUrl: string };
  Kamera: { example_visual_url: string | null, workId: number, quality_control_id: number , productId: number };
  Önizleme: { pictureUri: string, example_visual_url: string | null, workId: number, quality_control_id: number, productId: number  };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await getData('userToken');
      } catch (e) {
        // Restoring token failed
      }
      setUserToken(token);
      setLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={userToken ? "Main" : "Login"}>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Main" component={TabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="WorkOrderScreen" component={WorkOrderScreen}/>
      <Stack.Screen name="PdfViewerScreen" component={PdfViewerScreen}/>
      <Stack.Screen name="Kamera" component={CameraScreen}/>
      <Stack.Screen name="Önizleme" component={PreviewScreen}/> 
    </Stack.Navigator>
  );
}

export default StackNavigator;

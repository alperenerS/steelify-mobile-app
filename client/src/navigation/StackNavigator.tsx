import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import WorkOrderScreen from '../screens/WorkOrderScreen';
import PdfViewerScreen from '../screens/PdfViewerScreen';
import CameraScreen from '../screens/CameraScreen';
import PreviewScreen from '../screens/PreviewScreen';
import {getData} from '../utils/storage';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  WorkOrderScreen: { workId: number; productId: number, productName: string};
  PdfViewerScreen: {
    pdfUrl: string;
    workId: number;
    productId: number; 
  };  Camera: { existingPictures: string[], example_visual_url: string | null, workId: number, quality_control_id: number , productId: number, technical_drawing_numbering: string, lower_tolerance: string, upper_tolerance: string, step_name: string, order_number: number, product_name: string | null, vendor_id: number, description: string,};
  Önizleme: { pictures: string[], example_visual_url: string | null, workId: number, quality_control_id: number, productId: number, technical_drawing_numbering: string, lower_tolerance: string, upper_tolerance: string, step_name: string, order_number: number, product_name: string | null, vendor_id: number, issue_text: string | null , description: string, issue_description: string| null };
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
    <Stack.Navigator initialRouteName={userToken ? 'Main' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="WorkOrderScreen" component={WorkOrderScreen} />
      <Stack.Screen name="PdfViewerScreen" component={PdfViewerScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Önizleme" component={PreviewScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

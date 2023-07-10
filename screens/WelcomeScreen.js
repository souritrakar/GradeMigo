import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

export default function WelcomeScreen({navigation}) {

  const [fontsLoaded] = useFonts({
    'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

    const Skip = ({ ...props }) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
          <Text style={{ fontSize: 16, color:"#fff" , marginLeft: 10}}>Skip</Text>
        </TouchableOpacity>
      );
    
      const Next = ({ ...props }) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
          <Text style={{ fontSize: 16, color:"#fff", marginRight: 10 }}>Next</Text>
        </TouchableOpacity>
      );
    
      const Done = ({ ...props }) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
          <Text style={{ fontSize: 16, color:"#fff", marginRight: 5}}>Done</Text>
        </TouchableOpacity>
      );
      if (!fontsLoaded) {
        return  null;
      } else{
        return (


          <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("TabNavigator")}
            onDone={() => navigation.replace("TabNavigator")}
              pages={[
                {
                  backgroundColor: '#012A36',
                  image: <Image style={{width:250, height:250}} source={require('../assets/slide1.png')} />,
                  title: 'Onboarding',
                  titleStyles: {fontFamily:"Rubik-Regular"},
                  subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                  backgroundColor: '#0b3954',
                  image: <Image style={{width:250, height:250}} source={require('../assets/slide1.png')} />,
                  title: 'Onboarding',
                  subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                  backgroundColor: '#fff',
                  image: <Image style={{width:250, height:250}} source={require('../assets/undraw_Professor_re_mj1s-removebg-preview.png')} />,
                  title: 'Onboarding',
                  subtitle: 'Done with React Native Onboarding Swiper',
                },
              
              ]}
          />
      );
      }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

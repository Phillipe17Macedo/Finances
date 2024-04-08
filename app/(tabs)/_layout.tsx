import { Link, Tabs } from 'expo-router';
import { HeaderButton } from '../../components/HeaderButton';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet, StatusBar, Pressable } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#84B026',
        tabBarInactiveTintColor: '#202022',
        tabBarShowLabel: true,
        tabBarStyle:{
          position: 'absolute',
          backgroundColor: '#F2F2F2',
          borderTopWidth: 0,
          bottom: 15,
          alignSelf: "center",
          left: 80,
          right: 80,
          elevation: 0,
          borderRadius: 50,
          height: 70,
          paddingTop: 10,
          paddingBottom: 12,
        },
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-sharp" color={color} size={28} />,
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-circle"
                    size={56}
                    color="#fff"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle:{
            height: 120,
            backgroundColor: '#6C1ED9',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
            fontSize: 25,
          }
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Planilha',
          tabBarIcon: ({color}) => <FontAwesome6 name="file-excel" color={color} size={28}/>,
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-circle"
                    size={56}
                    color="#fff"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle:{
            height: 120,
            backgroundColor: '#6C1ED9',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
            fontSize: 25,
          }
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

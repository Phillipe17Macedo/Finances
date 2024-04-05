import { Link, Tabs } from 'expo-router';
import { HeaderButton } from '../../components/HeaderButton';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-sharp" color={color} size={28} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
          headerStyle:{
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
          tabBarIcon: ( ) => <FontAwesome6 name="file-excel" color={"black"} size={28}/>,
        }}
      />
    </Tabs>
  );
}

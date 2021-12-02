import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  NavigationContainer,
  DefaultTheme,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { View, Platform } from "react-native";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";

import {
  Home,
  Account,
  Category,
  Mall,
  OfficialStores,
  Wishlist,
  CategoryDetail,
  SearchScreen,
  CartScreen,
  ProductDetailScreen,
  Login,
  Register,
  ForgetPassword,
  Wallet,
  Orders,
  RMARequest,
  ShippingAddress,
  AccountDetails,
  OrderDetails,
  AddressConfirmation,
  PaymentOptions,
  CardInformation,
  OrderSummary,
  OrderDone,
  BillingAddress,
  Store,
  TomatoKitchen,
  TomatoMart,
  ElectronicMall,
  TomatoZay,
  KidsMall,
  PetMall,
  MegaSaleMall,
  BeautyMall,
  Reviews,
  LiveSale,
  MyKids,
  MyPet,
  CutePress,
  Loreal,
  Garnier,
  UnileverEAC,
  Remax,
  Maybelline,
  Nestle,
  Pahtama,
  CocaCola,
  RoyalD,
  Ovaltine,
  PanasonicBeauty,
  Samsung,
  Mi,
  TheGiftBedding,
  Hp,
  Asus,
  Kawasaki,
  Xo,
  Konfulon,
  Huawei,
  Midea,
  Pampers,
  MaxAndMia,
  NatureHugs,
  Dugro,
  Olay,
  PAndG,
  JayJun,
  Mediheal,
  SuperRed,
  KACosmetics,
  YvesRochers,
  Eushido,
  Nichii,
  Konad,
  Stinmug,
  SaiConsmetics,
  Ccare,
  Acnes,
  Lipice,
  Selsun,
  SunPlay,
  Marico,
  AungKaBarTrading,
  Acer,
  AscentTechnology,
  BabyMild,
  TomatoCoins,
  AllStores,
  Coupons,
  Beausta,
  Beko,
  BioOil,
  Citra,
  Clear,
  Code10,
  DNee,
  DKSH,
  Dumex,
  ELan,
  EABC,
  FamilyCare,
  Giordano,
  GooN,
  HeinekenMyanmar,
  Betadine,
  Knorr,
  Lifebuoy,
  Lux,
  MamyPoko,
  MicroScooterMyanmar,
  Milo,
  MSI,
  NestleProfessionalMyanmar,
  Parachute,
  Pigeon,
  Ponds,
  RDC,
  Rexona,
  StarSecretKorea,
  Vaseline,
  Warrix,
  Stimmug,
  CovidSafetyPackage,
  MyanmarConsumerEnterprise,
  Crayola,
  PromoWithTag,
  HowToShop,
  TwelveTwelve,
  ServiceDetail,
  Brand,
  BrandProducts,
  Brands,
} from "../screens";

import { THEME } from "../DynamicStyle/style";
import { TabBarBadge } from "../components";
import CommingSoon from "../screens/CommingSoon";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const navtheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: THEME.primary,
    card: THEME.card,
    background: THEME.background,
  },
};

const officialStores = [
  {
    name: "Garnier",
    screen: Garnier,
  },
  {
    name: "UnileverEAC",
    screen: UnileverEAC,
  },
  {
    name: "Remax",
    screen: Remax,
  },
  {
    name: "Maybelline",
    screen: Maybelline,
  },
  {
    name: "Nestle",
    screen: Nestle,
  },
  {
    name: "Loreal",
    screen: Loreal,
  },
  {
    name: "CutePress",
    screen: CutePress,
  },
  {
    name: "CocaCola",
    screen: CocaCola,
  },
  {
    name: "Ovaltine",
    screen: Ovaltine,
  },
  {
    name: "Pahtama",
    screen: Pahtama,
  },
  {
    name: "Acer",
    screen: Acer,
  },
  {
    name: "Acnes",
    screen: Acnes,
  },
  {
    name: "AscentTechnology",
    screen: AscentTechnology,
  },
  {
    name: "ASUS",
    screen: Asus,
  },
  {
    name: "AungKaBarTrading",
    screen: AungKaBarTrading,
  },
  {
    name: "BabyMild",
    screen: BabyMild,
  },
  {
    name: "Beausta",
    screen: Beausta,
  },
  {
    name: "Beko",
    screen: Beko,
  },
  {
    name: "Betadine",
    screen: Betadine,
  },
  {
    name: "BioOil",
    screen: BioOil,
  },
  {
    name: "Citra",
    screen: Citra,
  },
  {
    name: "Clear",
    screen: Clear,
  },
  {
    name: "Code10",
    screen: Code10,
  },
  {
    name: "DNee",
    screen: DNee,
  },
  {
    name: "DKSH",
    screen: DKSH,
  },
  {
    name: "DumexGugro3",
    screen: Dumex,
  },
  {
    name: "ELan",
    screen: ELan,
  },
  {
    name: "EABC",
    screen: EABC,
  },
  {
    name: "FamilyCare",
    screen: FamilyCare,
  },
  {
    name: "Giordano",
    screen: Giordano,
  },
  {
    name: "GooN",
    screen: GooN,
  },
  {
    name: "Heineken",
    screen: HeinekenMyanmar,
  },
  {
    name: "HP",
    screen: Hp,
  },
  {
    name: "Huawei",
    screen: Huawei,
  },
  {
    name: "JayJun",
    screen: JayJun,
  },
  {
    name: "KA",
    screen: KACosmetics,
  },
  {
    name: "Kawasaki",
    screen: Kawasaki,
  },
  {
    name: "Knorr",
    screen: Knorr,
  },
  {
    name: "Konda",
    screen: Konad,
  },
  {
    name: "Konfulon",
    screen: Konfulon,
  },
  {
    name: "Lifebuoy",
    screen: Lifebuoy,
  },
  {
    name: "Lipice",
    screen: Lipice,
  },
  {
    name: "LUX",
    screen: Lux,
  },
  {
    name: "MamyPoko",
    screen: MamyPoko,
  },
  {
    name: "Marico",
    screen: Marico,
  },
  {
    name: "MaxAndMia",
    screen: MaxAndMia,
  },
  {
    name: "Mediheal",
    screen: Mediheal,
  },
  {
    name: "Mi",
    screen: Mi,
  },
  {
    name: "MicroScooter",
    screen: MicroScooterMyanmar,
  },
  {
    name: "Midea",
    screen: Midea,
  },
  {
    name: "Milo",
    screen: Milo,
  },
  {
    name: "MSI",
    screen: MSI,
  },
  {
    name: "NatureHugs",
    screen: NatureHugs,
  },
  {
    name: "NestleProfessional",
    screen: NestleProfessionalMyanmar,
  },
  {
    name: "Olay",
    screen: Olay,
  },
  {
    name: "PAndG",
    screen: PAndG,
  },
  {
    name: "Pampers",
    screen: Pampers,
  },
  {
    name: "PanasonicBeauty",
    screen: PanasonicBeauty,
  },
  {
    name: "Parachute",
    screen: Parachute,
  },
  {
    name: "Pigeon",
    screen: Pigeon,
  },
  {
    name: "PONDS",
    screen: Ponds,
  },
  {
    name: "RDC",
    screen: RDC,
  },
  {
    name: "Rexona",
    screen: Rexona,
  },
  {
    name: "RoyalD",
    screen: RoyalD,
  },
  {
    name: "SaiCosmetix",
    screen: SaiConsmetics,
  },
  {
    name: "StarSecretKorea",
    screen: StarSecretKorea,
  },
  {
    name: "Stimmung",
    screen: Stimmug,
  },
  {
    name: "SuperRed",
    screen: SuperRed,
  },
  {
    name: "Vaseline",
    screen: Vaseline,
  },
  {
    name: "Warrix",
    screen: Warrix,
  },
  {
    name: "Xo",
    screen: Xo,
  },
  {
    name: "YvesRocher",
    screen: YvesRochers,
  },
  {
    name: "CovidSafetyPackage",
    screen: CovidSafetyPackage,
  },
  {
    name: "MyanmarConsumerEnterprise",
    screen: MyanmarConsumerEnterprise,
  },
  {
    name: "Crayola",
    screen: Crayola,
  },
];

function renderOfficialStoreStack() {
  let screens = [];
  officialStores.map((os, i) => {
    screens.push(
      <Stack.Screen
        key={i}
        name={os.name}
        component={os.screen}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />
    );
  });
  return screens;
}

function OrderStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
        },
      }}
    >
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: "Order Details",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function WishListStack({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(navigation) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
        },
      }}
    >
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen
        name="Orders"
        component={OrderStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
      <Stack.Screen name="RMARequest" component={RMARequest} />
      <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={{
          title: "Shipping Address",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{
          title: "Account Details",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
      <Stack.Screen
        name="BillingAddress"
        component={BillingAddress}
        options={{
          title: "Billing Address",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
      <Stack.Screen
        name="TomatoCoins"
        component={TomatoCoins}
        options={{
          title: "Tomato Reward Coins",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
      <Stack.Screen
        name="Coupons"
        component={Coupons}
        options={{
          title: "My Coupons",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  const { accountDetails } = useSelector((state) => state, shallowEqual);
  return (
    <Stack.Navigator
      // initialRouteName={accountDetails.data.data.id ? "Account" : "Auth"}
      screenOptions={{ headerShown: false }}
    >
      {accountDetails.data.id !== null ? (
        <Stack.Screen name="Account" component={ProfileStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
      {/* <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Account" component={ProfileStack} /> */}
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
        },
      }}
    >
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false, title: "Cart" }}
      />
      <Stack.Screen
        name="AddressConfirmation"
        component={AddressConfirmation}
        options={{
          title: "Address Confirmation",
          headerStyle: { backgroundColor: THEME.primary },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptions}
        options={{ title: "Payment Options" }}
      />
      <Stack.Screen
        name="CardInformation"
        component={CardInformation}
        options={{ title: "Card Information" }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{ title: "Order Summary" }}
      />
      <Stack.Screen
        name="OrderDone"
        component={OrderDone}
        options={{ title: "Order Done" }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(navigation) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function HomeRootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={Home}
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Stack.Screen
        name="SearchStack"
        component={SearchScreen}
        options={{
          headerShown: false,
          title: "Search",
        }}
      />

      <Stack.Screen
        name="CartStack"
        component={CartStack}
        options={{
          headerShown: false,
          title: "Cart",
        }}
      />

      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(navigation) => ({
          headerShown: false,
          title: "Product Detail",
        })}
      />

      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        options={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTitleStyle: { fontFamily: "Roboto-Regular" },
          headerTintColor: "#fff",
          title: null,
        }}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTitleStyle: { fontFamily: "Roboto-Regular" },
          headerTintColor: "#fff",
          title: null,
        }}
      />

      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />

      <Stack.Screen
        name="AllStores"
        component={AllStores}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />

      <Stack.Screen
        name="CommingSoon"
        component={CommingSoon}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />

      <Stack.Screen
        name="PromoWithTag"
        component={PromoWithTag}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />

      <Stack.Screen
        name="HowToShop"
        component={HowToShop}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />

      <Stack.Screen
        name="TwelveTwelve"
        component={TwelveTwelve}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={(navigation) => ({
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: THEME.primary,
          },
        })}
      />
      <Stack.Screen
        name="BrandProducts"
        options={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTitleStyle: { fontFamily: "Roboto-Regular" },
          headerTintColor: "#fff",
          title: null,
        }}
        component={BrandProducts}
      />
      {/* {renderOfficialStoreStack()} */}
    </Stack.Navigator>
  );
}

function CategoryStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        options={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTitleStyle: { fontFamily: "Roboto-Regular" },
          headerTintColor: "#fff",
          title: null,
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(navigation) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function BrandStack() {
  return (
    <Stack.Navigator initialRouteName="Brands">
      <Stack.Screen
        name="Brands"
        component={Brands}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrandProducts"
        options={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTitleStyle: { fontFamily: "Roboto-Regular" },
          headerTintColor: "#fff",
          title: null,
        }}
        component={BrandProducts}
      />
    </Stack.Navigator>
  );
}

function MallStack() {
  return (
    <Stack.Navigator initialRouteName="OfficialStores">
      <Stack.Screen
        name="OfficialStores"
        component={OfficialStores}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TomatoMall"
        component={Mall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TomatoKitchen"
        component={TomatoKitchen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ElectronicMall"
        component={ElectronicMall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TomatoZay"
        component={TomatoZay}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KidsMall"
        component={KidsMall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PetMall"
        component={PetMall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MegaSaleMall"
        component={MegaSaleMall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BeautyMall"
        component={BeautyMall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TomatoMart"
        component={TomatoMart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(navigation) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        options={(navigation) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTitleStyle: { fontFamily: "Roboto-Regular" },
          headerTintColor: "#fff",
          title: null,
        }}
      />
      {renderOfficialStoreStack()}
    </Stack.Navigator>
  );
}

function getTabBarVisible({ route }) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
  if (routeName === "ProductDetail") {
    return true;
  }
  return false;
}

function HomeBottomTab() {
  const { liveVideos } = useSelector((state) => state, shallowEqual);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: THEME.primary,
        inactiveTintColor: THEME.text_primary,
        labelStyle: {
          fontFamily: "Roboto-Black",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeRootStack}
        options={(navigation) => ({
          title: "Home",
          // tabBarVisible: getTabBarVisible(navigation),
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="home" color={color} size={size / 1.2} />
          ),
        })}
      />
      <Tab.Screen
        name="LivePromo"
        // component={LiveSale}
        component={CommingSoon}
        options={{
          title: "Live Promo",
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ position: "relative" }}>
              <AntDesign name="videocamera" color={color} size={size / 1.2} />
              {liveVideos.isLiveVideos && <TabBarBadge />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MallTab"
        component={BrandStack}
        options={{
          title: "Brands",
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="handbag" color={color} size={size / 1.2} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryStack}
        options={{
          title: "Category",
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="menu" color={color} size={size / 1.2} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          title: "Account",
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="user" color={color} size={size / 1.2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer theme={navtheme}>
      <HomeBottomTab />
    </NavigationContainer>
  );
}

import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import { wishListReducer } from "./reducers/wishListReducer";
import { AddressReducer } from "./reducers/addressReducer";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
import { productReducer } from "./reducers/productReducer";
import { storeReducer } from "./reducers/storeReducer";
import { CategoriesReducer } from "./reducers/CategoriesReducer";
import { CategoryProductReducer } from "./reducers/CategoryProductsReducer";
import { AccountDetailsReducer } from "./reducers/AccountDetailsReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { CartReducer } from "./reducers/CartReducer";
import { OrdersReducer } from "./reducers/OrdersReducer";
import { LiveVideosReducer } from "./reducers/LiveVideosReducer";

const rootReducer = combineReducers({
  user: userReducer,
  wishlist: wishListReducer,
  address: AddressReducer,
  product: productReducer,
  store: storeReducer,
  categories: CategoriesReducer,
  categoryProducts: CategoryProductReducer,
  accountDetails: AccountDetailsReducer,
  history: HistoryReducer,
  cart: CartReducer,
  orders: OrdersReducer,
  liveVideos: LiveVideosReducer,
});

const persistConfig = {
  key: "main",
  storage: AsyncStorage,
  blacklist: ["navigation", "liveVideos"],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducers, applyMiddleware(thunk));
export const persistor = persistStore(store);

// Reset Redux Presis Cache
// persistor.purge();

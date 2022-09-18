import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AppContext from './context';
import Drawer from './components/Drawer';
import Header from './pages/Header';
import Content from './pages/Content';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export default function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const total = cartItems.reduce((total, sum) => total + sum.price, 0);

  // FETCH REQUEST
  // useEffect(() => {
  //   fetch("https://6314e256fa82b738f7501dc4.mockapi.io/items")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => setItems(json))
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://6314e256fa82b738f7501dc4.mockapi.io/items")
  //     .then((res) => {
  //       setItems(res.data);
  //     });

  //   axios
  //     .get("https://6314e256fa82b738f7501dc4.mockapi.io/favorites")
  //     .then((res) => {
  //       setFavorites(res.data);
  //     });
  //   axios
  //     .get("https://6314e256fa82b738f7501dc4.mockapi.io/cart")
  //     .then((res) => {
  //       setCartItems(res.data);
  //     });
  // }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const favoritesResponse = await axios.get(
        'https://6314e256fa82b738f7501dc4.mockapi.io/favorites',
      );
      const cartResponse = await axios.get('https://6314e256fa82b738f7501dc4.mockapi.io/cart');
      const itemsResponse = await axios.get('https://6314e256fa82b738f7501dc4.mockapi.io/items');
      const ordersResponse = await axios.get('https://6314e256fa82b738f7501dc4.mockapi.io/orders');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
      setOrders(ordersResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => item.parentId === obj.id);
    console.log(findItem);
    try {
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => item.parentId !== obj.id));
        await axios.delete(`https://6314e256fa82b738f7501dc4.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6314e256fa82b738f7501dc4.mockapi.io/cart', obj);

        //
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              //
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }

    // }
  };
  const onAddToFavorites = async (obj) => {
    // мы делаем чтото вроде toggle с добацлением обьекта в массиве
    // если есть хоть один обьект в массиве Favorites совпадает с полученым обьектом , то мы запускаем процедуру удаление  этого обьекта из базы данных
    // в setFavorites из  state favorite с помощью фильтрации удалим данный обьект
    // если же такого Obj.id нет в  массиве state favorites то тогда создайего

    // console.log(obj.id)
    try {
      const findFavorite = favorites.find((favObj) => favObj.parentId === obj.id);
      if (findFavorite) {
        await axios.delete(
          `https://6314e256fa82b738f7501dc4.mockapi.io/favorites/${findFavorite.id}`,
        );
        setFavorites((prev) => prev.filter((pObj) => pObj.parentId !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://6314e256fa82b738f7501dc4.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.alert(' Не получается добавить этот товар в закладки, попробуйте ещё раз');
    }
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://6314e256fa82b738f7501dc4.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const drawerOpen = () => {
    setCartOpened(true);
  };
  const drawerClose = () => {
    setCartOpened(false);
  };
  /////to know which is my current location by page for Routing
  const location = useLocation();

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.parentId === id);
  };

  const isItemFav = (id) => {
    const x = favorites.some((obj) => obj.parentId === id);
    return x;
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        orders,
        isItemAdded,
        setCartItems,
        setOrders,
        isItemFav,
      }}
    >
      <div className="wrapper clear">
        <AnimatePresence>
          {cartOpened && (
            <Drawer drawerClose={drawerClose} onRemoveItem={onRemoveItem} total={total} />
          )}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Header drawerOpen={drawerOpen} total={total} />}>
              <Route
                index
                element={
                  <Content
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    onAddToCart={onAddToCart}
                    onAddToFavorites={onAddToFavorites}
                    isLoading={isLoading}
                  />
                }
              />

              <Route
                path="/favorites"
                element={
                  <Favorites
                    onAddToCart={onAddToCart}
                    onAddToFavorites={onAddToFavorites}
                    isItemFav={isItemFav}
                  />
                }
              />

              <Route path="/orders" element={<Orders />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

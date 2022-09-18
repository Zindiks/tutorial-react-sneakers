import { useContext } from "react";
import Card from "../../components/Card";
import { motion } from "framer-motion";
import AppContext from "../../context";
import Info from "../../components/Info";

export default function Favorites({ onAddToCart, onAddToFavorites }) {
  const { favorites } = useContext(AppContext);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {favorites.length < 1 ? (
        <div className="favorite-empty">
          <Info
            title="Закладок нет"
            description=""
            image="./img/empty-cart.jpg"
            action= {""}
          />
        </div>
      ) : (
        <>
          <h2>Закладки</h2>
          <div className="sneakers">
            {favorites.map((item, index) => {
              return (
                <Card
                  key={index}
                  onPlus={(obj) => onAddToCart(obj)}
                  onFavorite={(obj) => onAddToFavorites(obj)}
                  activeFav={true}
                  {...item}
                />
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}

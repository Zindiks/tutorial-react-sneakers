import { useContext } from "react";
import AppContext from "../../context";
import { motion } from "framer-motion";
import Card from "../../components/Card";

export default function Content({
  inputValue,
  setInputValue,
  onAddToCart,
  onAddToFavorites,
  isLoading,
}) {
  const { items, isItemAdded } = useContext(AppContext);

  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)]
        : items.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
    ).map((item, index) => {
      return (
        <Card
          key={index}
          onPlus={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorites(obj)}
          added={isItemAdded(item && item.id)}
          isLoading={isLoading}
          {...item}
        />
      );
    });
  };
  return (
    <motion.div
      className="content"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="additionalHeader">
        <h1>{inputValue ? `${inputValue}` : "Все кросовки"}</h1>
        <div className="search-block">
          <img src="./img/search.svg" alt="search" />
          <input
            placeholder="поиск"
            type="text"
            className=""
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          {inputValue && (
            <img
              src="./img/remove.svg"
              alt="remove"
              onClick={() => setInputValue("")}
            />
          )}
        </div>
      </div>

      <div className="sneakers">{renderItems()}</div>
    </motion.div>
  );
}

import Style from "./drawer.module.scss";
import CartItem from "./CartItem";
import Info from "../Info";

import { motion } from "framer-motion";
import { useContext, useState } from "react";
import AppContext from "../../context";
import axios from "axios";

export default function Drawer({ drawerClose, onRemoveItem,total }) {
  const {cartItems, setCartItems,setOrders} = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId,setOrderId] = useState(null)

   

  //Функция которая создаёт задержку в асинхронной операции
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms))
  
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      setIsOrderComplete(true);
  
      const {data} = await axios.post(
        "https://6314e256fa82b738f7501dc4.mockapi.io/orders",{items:cartItems,total:total.toFixed(2), tax:(total*0.21).toFixed(2) } );
      setOrderId(data.id);
  
      for (let i of cartItems) {
        await axios.delete(`https://6314e256fa82b738f7501dc4.mockapi.io/cart/${i.id}`)
        await delay(1000)
      };
  
      setCartItems([]);
      setOrders(prev=> [...prev,data]);
      
    }catch(error){
      alert('не удалось создать заказ :(')
    }
    setIsLoading(false);

  };

  return (
    <motion.div
      className={Style.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: 0 }}
    >
      <div className={Style.drawer}>
        {/*Здесь двойное условие если  */}
        {cartItems.length < 1 ? (
          <Info
            drawerClose={drawerClose}
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
            image={
              isOrderComplete
                ? "./img/complete-order.jpg"
                : "./img/empty-cart.jpg"
            }
            action={drawerClose}
          />
        ) : (
          <>
            <h2 className={Style.header}>
              Корзина
              <img
                width={40}
                src="./img/btn-remove.svg"
                alt="remove"
                className="removeBtn"
                onClick={() => drawerClose()}
              />
            </h2>

            <div className={Style.items}>
              {cartItems.map((item) => {
                return (
                  <>
                    <CartItem
                      key={item.price}
                      onRemoveItem={onRemoveItem}
                      {...item}
                    />
                  </>
                );
              })}
            </div>

            <div className={Style.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{total.toFixed(2)} EUR</b>
                </li>
                <li>
                  <span>Налог 21%:</span>
                  <div></div>
                  <b>{(total*0.21).toFixed(2)} EUR</b>
                </li>
              </ul>

              <button className={Style.greenButton} disabled={isLoading} onClick={onClickOrder}>
                Оформить заказ <img src="./img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

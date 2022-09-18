import Style from './cartitem.module.scss'
export default function CartItem({ img, name, price, onRemoveItem,id }) {



  return (

    <div className={Style.cartItem}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={Style.cartItemImg}
      ></div>
      <div className="mr-20">
        <p className="mb-5">{name}</p>
        <span>
          <b>{price}</b>
        </span>
        <b> eur</b>
      </div>

      <img src="./img/btn-remove.svg" alt="remove" className={Style.removeBtn} onClick={()=>onRemoveItem(id)}/>
    </div>
  );
}

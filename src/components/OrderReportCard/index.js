import fromNow from "../fromNow";
import Style from "./orderreportcard.module.scss";
export default function OrderReportCard({
  id,
  name,
  createdAt,
  avatar,
  items,
  total,
  tax,
}) {
  return (
    <div className={Style.orderReporList}>
      <div className={Style.clientInfoBar}>
        <div className={Style.orderNum}>
          <h2>{`Номер заказа #${id}`}</h2>
        </div>
        <div className={Style.orderDate}>{fromNow(createdAt)}</div>
        <div className={Style.clientName}>
          <h3>{name}</h3>
        </div>
        <div className={Style.clientAvatar}>
          <img src={avatar} alt={`${name} Avatar`} />
        </div>
      </div>
      <div className={Style.orderItems}>
        {items.map((item) => {
          return (
            <div className={Style.item}>
              <img className={Style.img} src={item.img} alt={item.name} />
              <p className={Style.description}>{item.name}</p>
              <div className={Style.price}>
                <span>
                  <b>{item.price} </b>
                </span>
                <b> EUR</b>
              </div>
              <br/>
            </div>
          );
        })}
      </div>

      <div className={Style.cartTotalBlock}>
        <ul>
          <li>
            <span>Итого:</span>
            <div></div>
            <b>{total} EUR</b>
          </li>
          <li>
            <span>Налог 21%:</span>
            <div></div>
            <b>{tax} EUR</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

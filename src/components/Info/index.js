import Style from "../Info/info.module.scss"


export default function Order({title,description,image,action}) {
  return (
    <div className={Style.cartEmpty}>
      <img src={image} alt="complete-order" />
      <h2>{title}</h2>
      <p className="opacity-6">
        {description}
      </p>
      <button className={Style.greenButton} onClick={action}>
        <img src="/img/arrow.svg" alt="arrow" /> Вернуться назад
      </button>
    </div>
  );
}

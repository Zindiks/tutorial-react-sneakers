import Style from "./card.module.scss";
import { useState,useContext} from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

export default function Card({
  id,
  name,
  price,
  img,
  onPlus,
  onFavorite,
  activeFav ,
  added,
  isLoading,
}) {
  const {isItemAdded,isItemFav} = useContext(AppContext)
  // const [isPlusBtn, setIsPlusBtn] = useState(added);
  const [isFavorite, setIsFavorite] = useState(activeFav);
  const obj = { name, price, img, parentId :id, id }

  // console.log(name,isItemAdded(id))
  console.log(id,isItemFav(id))

  const onHandleIsPlusButton = () => {
    onPlus(obj);
  };

  const onHandleFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={Style.card}>
      {isLoading? (
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 155 240"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="210" rx="5" ry="5" width="65" height="30" />
          <rect x="122" y="208" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={Style.favorite}>
            <img
              onClick={onHandleFavorite}
              src={`/img/${isItemFav(id) ? "liked" : "unliked"}.svg`}
              alt="unliked"
            />
          </div>
          <img
            width={180}
            height={160}
            src={img}
            alt="sneakerImg"
            className={Style.sneakerImg}
          />
          <div className={Style.underImg}>
            <h5>{name}</h5>
            <div className={Style["price-button"]}>
              <div className={Style.price}>
                <span>Цена:</span>
                <b>
                  {price} <span>eur</span>
                </b>
              </div>
              <img
                className={Style.button}
                onClick={onHandleIsPlusButton}
                src={`./img/${isItemAdded(id) ? "btn-checked" : "plus"}.svg`}
                alt="plus"
              />
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
}

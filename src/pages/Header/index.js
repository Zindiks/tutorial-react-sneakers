import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ReactComponent as ImgCart } from "./img/cart.svg";
import { ReactComponent as ImgHeart } from "./img/heart.svg";
import { ReactComponent as ImgUser } from "./img/user.svg";





export default function Header({ drawerOpen, total }) {


  return (
    <>
      <header className="d-flex justify-between align-center">
        <div className="d-flex align-center">
          <NavLink to="/">
            <img
              width={50}
              height={50}
              src="./img/logo.png"
              alt="logo"
              className=""
            />
          </NavLink>
          <div className="info pl-15">
            <h3 className="m-0 text-uppercase">React Sneakers</h3>
            <p className="m-0 opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>

        <ul className="d-flex align-center justify-around clear">
          <li className="d-flex flex-column cu-p " onClick={() => drawerOpen()}>
            <ImgCart className="mr-10 cu-p align-center" />
            <span className="mr-10 cu-p align-center opacity-5 fw-bold">
              {total.toFixed(2)} EUR
            </span>
          </li>

          <li>
            <NavLink to="/favorites">
              <ImgHeart className="mr-30 cu-p" alt="favorites" />
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders">
              <ImgUser alt="user" />
            </NavLink>
          </li>
        </ul>
      </header>

      <Outlet />

      {/* <footer> 2022 </footer> */}
    </>
  );
}

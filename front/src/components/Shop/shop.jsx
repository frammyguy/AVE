import React from "react";
import "./shop.sass";
import IMG from "../../krusts.png";

const boosters = [
  {
    id: 1,
    name: "Buster 1",
    level: 4,
    price: 440,
  },
  {
    id: 2,
    name: "Buster 2",
    level: 3,
    price: 320,
  },
  {
    id: 3,
    name: "Buster 3",
    level: 2,
    price: 190,
  },
  {
    id: 4,
    name: "Buster 4",
    level: 1,
    price: 30,
  },
];

const strengths = [
  {
    id: 1,
    name: "Spēks 1",
    level: 4,
    price: 590,
  },
  {
    id: 2,
    name: "Spēks 2",
    level: 3,
    price: 280,
  },
  {
    id: 3,
    name: "Spēks 3",
    level: 2,
    price: 140,
  },
  {
    id: 4,
    name: "Spēks 4",
    level: 1,
    price: 30,
  },
];

const Wrap = (props) => {
  return (
    <div className="mod-wrap">
      <h2>{props.name}</h2>
      {props.arr.map((booster) => (
        <div className="mod-descr" key={booster.id}>
          <div className="mod-descr-wrap">
            <h3>{booster.name}</h3>
            <p className="mod-level">lvl: {booster.level}</p>
          </div>
          <p className="mod-price">
            <img src={IMG} alt="plus-img" /> {booster.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function Shop() {
  return (
    <div className="box shop">
      <div className="button-wrap">
        <button className="button-wrap-element">Atvert nodaļu</button>
        <button className="button-wrap-element">Atvert rakstu</button>
      </div>

      <div className="mod">
        <Wrap arr={boosters} name="Busteri (pasīvs ienākums)" />
        <Wrap arr={strengths} name="Busteri (ienākums no klikiem)" />
      </div>
    </div>
  );
}

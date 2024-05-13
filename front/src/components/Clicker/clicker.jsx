import React, {useState} from "react";
import "./clicker.sass";
import IMG from "../../krusts.png";

export default function Clicker() {

  const [balance, setBalance] = useState(0)

  return (
    <div className="box clicker">
      <div className="balance">
        <img src={IMG} alt="balance" />
        <span>{balance}</span>
      </div>
      <button onClick={() => setBalance(balance + 1)} className="clicker_wrap b">
        <div className="clicker_wrap r">
          <div className="clicker_wrap b">
            <div className="clicker_wrap r">
                <img src={IMG} alt="clicker" />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
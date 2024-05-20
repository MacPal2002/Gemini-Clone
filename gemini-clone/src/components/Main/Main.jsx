import React from 'react'
import './Main.css'
import { assets } from "../../assets/assets";

const Main = () => {
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span>Cześć, Dev.</span></p>
                <p>W czym mogę Ci pomóc?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Zaproponuj piękne miejsca do zobaczenia podczas zbliżającej się podróży</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Krótko podsumuj tę koncepcję: urbanistyka</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Przeprowadź burzę mózgów dotyczącą działań łączących zespół w ramach naszych rekolekcji roboczych</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Popraw czytelność poniższego kodu</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Zadaj pytanie' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                Informacje, które podaje Gemini (m.in. o osobach), mogą zawierać nieścisłości, dlatego dokładnie sprawdzaj odpowiedzi.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
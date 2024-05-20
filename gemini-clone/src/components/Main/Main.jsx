import React from 'react'
import { useContext } from 'react';
import './Main.css'
import { assets } from "../../assets/assets";
import { Context } from '../../context/Context';

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, handleKeyDown} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult
            ?
            <>
                <div className="greet">
                    <p><span>Cześć, Macieju</span></p>
                    <p>W czym mogę Ci pomóc?</p>
                </div>
                <div className="cards">
                    <div className="card" onClick={(e) => onSent(e.currentTarget.querySelector('p').textContent)}>
                        <p>Zaproponuj piękne miejsca do zobaczenia podczas zbliżającej się podróży</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card" onClick={(e) => onSent(e.currentTarget.querySelector('p').textContent)}>
                        <p>Krótko podsumuj tę koncepcję: urbanistyka</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card" onClick={(e) => onSent(e.currentTarget.querySelector('p').textContent)}>
                        <p>Przeprowadź burzę mózgów dotyczącą działań łączących zespół w ramach naszych rekolekcji roboczych</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card" onClick={(e) => onSent(e.currentTarget.querySelector('p').textContent)}>
                        <p>Popraw czytelność poniższego kodu</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>    
            </>
            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?
                    <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }  
                </div>
            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={handleKeyDown} type="text" placeholder='Zadaj pytanie' />
                    <div>
                        {input? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                    </div>
                </div>
                <p className="bottom-info">
                Informacje, które podaje Gemini (m.in. osobach), mogą zawierać nieścisłości, dlatego dokładnie sprawdzaj odpowiedzi.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
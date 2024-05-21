import { createContext, useState, useRef, useEffect } from "react";
import run from "../config/gemini";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { marked } from 'marked';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");
    const resultContainerRef = useRef(null); // Ref do kontenera wyników

    useEffect(() => {
        if (resultContainerRef.current) {
            resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
        }
    }, [resultData]); // Przewijanie na dół przy zmianie resultData

    const delayPara = (index, nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord)
        }, 75*index)

    }

    const formatText = (text) => {
        // Konwersja Markdown do HTML
        const rawHtml = marked(text);
      
        // Funkcja do dekodowania encji HTML
        const decodeHtml = (html) => {
          const txt = document.createElement('textarea');
          txt.innerHTML = html;
          return txt.value;
        };
      
        // Podświetlanie składni kodu
        const highlightedHtml = rawHtml.replace(
          /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
          (match, lang, code) => {
            // Dekodowanie encji HTML przed podświetlaniem
            const decodedCode = decodeHtml(code);
      
            if (hljs.getLanguage(lang)) {
              const highlightedCode = hljs.highlight(decodedCode, { language: lang }).value;
              return `<pre><code class="hljs ${lang}">${highlightedCode}</code></pre>`;
            }
            return match;
          }
        );
      
        return highlightedHtml;
      };

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);

    }

    const onSent = async (prompt, save=true) => {
        setResultData("")
        setLoading(true);
        setShowResult(true);
        let response;

        if (save){
            setPrevPrompts(prev=>[...prev, prompt])
        }

        setRecentPrompt(prompt);
        response = await run(prompt);

        let newResponseArray = formatText(response).split(" ");

        for( let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");
        } 
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        resultContainerRef,
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
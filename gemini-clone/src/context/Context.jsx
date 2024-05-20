import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord)
        }, 75*index)

    }

    const formatText = (inputText) => {
        let outputText = inputText.replace(/##(.*?)\n/g, "<h2>$1</h2>");
        outputText = outputText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        outputText = outputText.replace(/\*(.*?)\n/g, "<li>$1</li>");
        outputText = outputText.replace(/(?:\r\n|\r|\n)/g, '<br>');
        return outputText;
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
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
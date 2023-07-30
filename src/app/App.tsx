// import { useState } from "react"
// import { AppHeader } from "src/widgets/appHeader"

import { AppHeader } from "src/widgets/appHeader"
import './styles/main.scss'
import { RandomChar } from "src/widgets/randomChar"
import { CharList } from "src/widgets/charList"
import { useState } from "react"
// import AppHeader from "../widgets/appHeader/AppHeader"
// import RandomChar from "../components/randomChar/RandomChar"
// import CharList from "../components/charList/CharList"
// import CharInfo from "../components/charInfo/CharInfo"

const App = () => {
    const [selectedChar, setSelectedState] = useState()
    console.log(selectedChar)
    const onCharSelected = (id: any) => {
        setSelectedState(id)
    }

    return (
        <div className="app bg-zinc-800 h-screen">
            <AppHeader />
            <div className="bg-zinc-800">
                <RandomChar />
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    {/* <CharInfo charId={selectedChar}/> */}
                </div>
            </div>
        </div>
    )
    
}

export default App
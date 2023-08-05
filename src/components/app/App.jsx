import RandomChar from "../randomChar/RandomChar";
import Header from "../header/header";
import CharList from "../charList/CharList";
import '../../styles/index.scss'

const App = () => {
    return ( 
        <div className="app mb-10">
            <Header />
            <RandomChar />
            <CharList />
        </div>
     );
}
 
export default App;
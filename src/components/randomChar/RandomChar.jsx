import { Component } from "react";
import MarvelServise from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import LeftBlock from "./leftBlock/LeftBlock";
import RightBlock from "./rightBlock/RightBlock";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
    marvelService = new MarvelServise()

    state = {
        char: {},
        isLoading: true,
        error: false
    }

    componentDidMount = () => {
        console.log('mount')
        // this.timetID = setInterval(() => {
            this.updateChar()
        // }, 5000)
    }

    // componentWillUnmount = () => {
    //     console.log('unmount')
    //     clearInterval(this.timetID)
    // }

    onCharLoaded = (char) => {
        this.setState({char, isLoading: false})
    }

    onError = () => {
        this.setState({
            isLoading: false,
            error: true
        })
    }

    onTryClick = (e) => {
        e.preventDefault()
        this.setState({isLoading: true, error: false})
        this.updateChar()
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1010000) + 1010000)

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, isLoading, error} = this.state

        const errorMessage = error ? <ErrorMessage /> : null
        const loading = isLoading ? <Spinner /> : null
        const content = !(isLoading || error) ? <LeftBlock char={char} /> : null

        // styles 
        const mainBlock = "flex mt-10 shadow-xl rounded-lg overflow-hidden"
        const leftBlock = "flex p-6 w-2/4"
        const rightBlock =  "flex flex-col justify-between w-2/4 p-6 bg-[--main-bg-color] text-[--main-text-color]"

        return (
            <div className="container">
                <div className={mainBlock}> 
                    <div className={leftBlock}>
                        {errorMessage}
                        {loading}
                        {content}
                    </div>
                    
                    <div className={rightBlock}>
                        <RightBlock onTry={this.onTryClick} />
                    </div>

                </div>

            </div>
        )
    }
}

export default RandomChar
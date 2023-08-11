import { Component } from "react";
import "./charList.scss";
import MarvelServise from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        charList: [],
        isLoading: true,
        error: false
    }

    marvelServ = new MarvelServise()

    componentDidMount = () => {
        this.marvelServ
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            isLoading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            isLoading: false
        })
    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            let imgStyle = {'objectFit' : 'cover'}

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }

            return (
                <li 
                    key={item.id} 
                    className="char__item"
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {error, isLoading} = this.state

        const loading = isLoading ? <Spinner /> : null
        const errorMessage = error ? <ErrorMessage /> : null
        const content = !(isLoading || error) ? this.renderItems(this.state.charList) : null
        return (
            <div className="char__list">
                {/* {this.renderItems(this.state.charList)} */}
                {loading}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }

};

export default CharList;

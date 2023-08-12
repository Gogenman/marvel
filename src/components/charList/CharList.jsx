import { Component } from "react";
import "./charList.scss";
import MarvelServise from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        charList: [],
        isLoading: true,
        error: false,
        newItemsLoading: false,
        offset: 290,
        charEnded: false
    }

    marvelService = new MarvelServise()

    componentDidMount = () => {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            isLoading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            isLoading: false
        })
    }

    charRefs = []

    setRef = (ref) => {
        this.charRefs.push(ref)
    }

    focusOnChar = (id) => {
        this.charRefs.forEach(char => {
            char.classList.remove('char__item_selected')
        })
        this.charRefs[id].classList.add('char__item_selected')
        this.charRefs[id].focus()
    }

    renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'}

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }

            return (
                <li 
                    ref={this.setRef}
                    key={item.id} 
                    className="char__item"
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.focusOnChar(i)
                    }}
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
        const {error, isLoading, newItemsLoading, offset, charEnded} = this.state

        const loading = isLoading ? <Spinner /> : null
        const errorMessage = error ? <ErrorMessage /> : null
        const content = !(isLoading || error) ? this.renderItems(this.state.charList) : null

        return (
            <div className="char__list">
                {loading}
                {errorMessage}
                {content}

                <button 
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }

};

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;

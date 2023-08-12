import "./charInfo.scss";
import MarvelServise from "../../services/MarvelService";
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

class CharInfo extends Component {
    state = {
        char: null,
        isLoading: false,
        error: false,
    };

    marvelService = new MarvelServise();

    componentDidMount = () => {
        this.updateChar();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.selectedChar !== this.props.selectedChar) {
            this.updateChar()
        } 
    }

    updateChar = () => {
        const { selectedChar } = this.props;
        if (!selectedChar) {
            return;
        }
        this.onCharLoading()
        this.marvelService
            .getCharacter(selectedChar)
            .then(this.onCharLoaded)
            .catch(this.onError);

        // this.foo.bar = ''
    };

    onCharLoaded = (char) => {
        this.setState({ char, isLoading: false });
    };

    onCharLoading = () => {
        this.setState({ isLoading: true });
    };

    onError = () => {
        this.setState({ isLoading: false, error: true });
    };

    render() {
        const {char, isLoading, error} = this.state

        const skeleton = char || isLoading || error ? null : <Skeleton />
        const loading = isLoading ? <Spinner /> : null
        const errorMessage = error ? <ErrorMessage /> : null
        const content = !(isLoading || error || !char) ? <View char={char}/> : null

        return <div className="char__info">
            {skeleton}
            {loading}
            {errorMessage}
            {content}
        </div>;
    }
}

const View = ({char}) => {
    const {thumbnail, homepage, wiki, name, comics} = char

    let imgStyle = {'objectFit' : 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'}
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics for this character'}
                {comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    selectedChar: PropTypes.number
}

export default CharInfo;

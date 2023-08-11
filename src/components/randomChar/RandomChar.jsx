import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { Component } from "react";
import MarvelServise from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
    state = {
        char: {},
        isLoading: true,
        error: false,
    };

    marvelService = new MarvelServise();

    componentDidMount = () => {
        this.updateChar();
        // this.foo.bar = '' 
        // this.timerId = setInterval(this.updateChar, 3000)
    };

    componentWillUnmount = () => {
        // clearInterval(this.timerId)
    }

    onCharLoaded = (char) => {
        this.setState({ char, isLoading: false });
    };

    onCharLoading = () => {
        this.setState({ isLoading: true });
    }

    onError = () => {
        this.setState({isLoading: false, error: true})
    }

    updateChar = () => {
        this.onCharLoading()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
    };

    onClick = () => {
        this.setState({isLoading: true})
        this.updateChar();
    };

    render() {
        const { isLoading, error, char } = this.state;

        const onError = error ? <ErrorMessage /> : null
        const loading = isLoading ? <Spinner /> : null
        const content = !(isLoading || error) ? <View char={char} /> : null

        return (
            <div className="randomchar">
                {content}
                {loading}
                {onError}
 
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button
                        onClick={this.onClick}
                        className="button button__main"
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="randomchar__decoration"
                    />
                </div>
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    let imgStyle = {'objectFit' : 'cover'}

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'}
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;

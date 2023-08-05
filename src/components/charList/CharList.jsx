import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServise from "../../services/MarvelService";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelServise();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    // Этот метод создан для оптимизации,
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        //useful:  'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const items = arr.map((item) => (
            <li
                className="rounded-xl overflow-hidden shadow-xl w-[200px] m-2 bg-[--main-bg-color] text-[--main-text-color] cursor-pointer"
                key={item.id}
            >
                <div className="overflow-hidden w-full h-[200px] object-contain">
                    <img
                        className="h-full object-cover"
                        src={item.thumbnail}
                        alt={item.name}
                    />
                </div>

                <div className="p-2">{item.name}</div>
            </li>
        ));
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className="flex flex-wrap w-4/5">{items}</ul>;
    }

    render() {
        const { charList, loading, error } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="mt-10">
                {errorMessage}
                {spinner}
                <div className="container">
                    {content}

                    <button className="btn self-center mt-10">load more</button>
                </div>
            </div>
        );
    }
}

export default CharList;

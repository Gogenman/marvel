/* eslint-disable @typescript-eslint/no-unused-vars */
// import ErrorMessage from '../../../components/errorMessage/ErrorMessage'
// import Spinner from '../spinner/Spinner'

import Spinner from 'src/shared/ui/Spinner'
import MarvelService from '../../../serviecs/MarvelService'
import { FC, useEffect, useState } from 'react'
import { Char } from 'src/widgets/randomChar/ui/RandomChar'

interface CharListProps {
    onCharSelected: (id: number) => void
}

const CharList: FC<CharListProps> = ({onCharSelected}) => {
    // state = {
    //     charList: [],
    //     loading: true,
    //     error: false
    // }

    const [charList, setCharList] = useState<Char[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const marvelService = new MarvelService()

    useEffect(() => {
        marvelService
            .getAllCharacters()
            .then((char) => onCharLisrLoaded(char))
            .catch(onError)
    }, [marvelService]) 

    const onCharLisrLoaded = (char: Char[]) => {
        setLoading(false)
        setCharList(char)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const renderItems = (charList: Char[]) => {
        const items = charList.map(item => {
            const img = (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') 
            ? 'object-contain' 
            : 'object-cover'
            const imgStyle = `${img} h-[150px] w-full`

            return (
                <li className=" bg-zinc-700 rounded-lg overflow-hidden"
                    key={item.id}
                    onClick={() => onCharSelected(item.id)}>
                        
                    <img src={item.thumbnail} className={imgStyle} alt={item.name} />
                    <div className="p-2">{item.name}</div>

                </li>
            )
        })
        
        return (
            <ul className="w-2/4 grid-rows-3 grid grid-cols-3 gap-x-5 gap-y-5">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList)

    const errorMessage = error ? 'error' : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? items : null


    return (
        <div className="char__list">
            <div className="container">
                {errorMessage}
                {spinner}
                {content}

                <button className="btns mt-10 mb-10">
                    <div className="inner">load more</div>
                </button>
            </div>

        </div>
    )
    
}

export default CharList
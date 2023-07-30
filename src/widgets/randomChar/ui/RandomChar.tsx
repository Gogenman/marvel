import { useEffect, useState } from 'react'

// import Spinner from '../../../components/spinner/Spinner'
// import ErrorMessage from '../../../components/errorMessage/ErrorMessage'
// import MarvelService from '../../../serviecs/MarvelService'
import MarvelService from 'src/serviecs/MarvelService'
import Spinner from 'src/shared/ui/Spinner'

export interface Char {
    name: string
    description: string
    thumbnail: string
    homepage: string
    wiki: string
    id: number
}

const RandomChar = () => {  
    const [char, setChar] = useState<Char>({
        name: '',
        description: '',
        thumbnail: '',
        homepage: '',
        wiki: '',
        id: 0
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    
    const marvelService = new MarvelService()

    useEffect(() => {
        updateChar();
      
        // Uncomment the following code if you want to use a timer
        // const timerId = setInterval(updateChar, 5000);
        // return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onError = () => {
        setLoading(false)
        setError(true)
    }
    
    const onCharLoading = () => {
    setLoading(true)
    }

    const onCharLoaded = (char: Char) => {
    setChar(char)
    setLoading(false)
    }

    const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    onCharLoading()
    marvelService
        .getCharacter(id)
        .then(onCharLoaded)
        .catch(onError)
    }


    const errorMessage = error ? 'error' : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? (<View char={char} />) : null
  

    return (
        <div className="randomchar text-white mb-10">
            <div className="container">
                <div className='flex bg-zinc-700 shadow-xl mt-10 rounded-lg overflow-hidden'>
                    {errorMessage}
                    {spinner}
                    {content}
                    <div className="p-4 flex flex-col justify-between">
                        <div >
                            <p className="font-bold text-3xl">
                                Random character for today!<br/>
                                Do you want to get to know him better?
                            </p>
                            <p className="mt-20 font-semibold text-2xl">
                                Or choose another one
                            </p>
                        </div>

                        <button 
                            onClick={updateChar}
                            className="">
                            <div className='btns'>try it</div>
                        </button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default RandomChar

const View = ({ char }: { char: Char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
  
    const imgStyle = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') 
        ? 'object-contain' 
        : 'object-cover'

    const viewImg = `h-[300px] w-[400px]  ${imgStyle}`
    const viewTitle = `font-bold text-3xl`
  
    return (
      <div className="w-3/4 border-r">
        <img src={thumbnail} alt="Random character" className={viewImg}/>
        <div className="p-4">
          <p className={viewTitle}>{name}</p>
          <p className="font-semibold mt-4">
            {description}
          </p>
          <div className="flex mt-5">
            <a href={homepage} className="button button__main">
              <div className='btns'>homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className='btns'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
    )
  }
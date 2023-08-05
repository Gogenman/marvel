const LeftBlock = ({ char }) => {
    const {name, description, thumbnail, homepage, wiki} = char
    //style
    const leftBlock__image = "w-2/4 overflow-hidden rounded-lg"
    const leftBlock__inner = "w-2/4 ml-4 flex flex-col justify-between"
    const leftBlock__title = "font-bold text-2xl"
    return (
        <>
            <div className={leftBlock__image}>
                <img className="" src={thumbnail} alt="character" />
            </div>

            <div className={leftBlock__inner}>
                <h1 className={leftBlock__title}>{name}</h1>
                <p>
                    {description
                        ? description
                        : "there is no description for this character..."}
                </p>
                <div>
                    <button className="btn mr-2">
                        <a href={homepage}>homepage</a>
                    </button>
                    <button className="btn">
                        <a href={wiki}>wiki</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LeftBlock;

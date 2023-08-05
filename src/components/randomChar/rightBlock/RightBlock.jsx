const RightBlock = ({onTry}) => {
    return (
        <>
            <p>
                Random character for today!
                <br />
                Do you want to get to know him better?
            </p>
            <p>Or choose another one</p>
            <button onClick={onTry} className="btn self-start">try it</button>
        </>
    );
};

export default RightBlock;

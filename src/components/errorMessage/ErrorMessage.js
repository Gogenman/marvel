import errImg from './error.gif'

const ErrorMessage = () => {
    return (
        <img 
            src={errImg} 
            alt="error"
            style={{
                width: 150,
                margin: '0 auto'
            }}
        />
    )
}

export default ErrorMessage
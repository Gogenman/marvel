/* eslint-disable jsx-a11y/anchor-is-valid */
const AppHeader = () => {
    //-Styles
    const header = `bg-zinc-900 text-white py-5`
    const headerContent = `flex justify-between items-center`
    const headerTitle = `w-3/4 text-3xl font-semibold `
    const headerTitleSpan = `text-red-600 font-bold`
    const headerNav = `w-1/4 flex justify-between`
    
    return (
        <header className={header}>
            <div className="container">
                <div className={headerContent}>
                    <h1 className={headerTitle}>
                        <a  href="#">
                            <span className={headerTitleSpan}>MARVEL.</span>INFO
                        </a>
                    </h1>
                    <ul className={headerNav}>
                        <li><a href="#">Characters</a></li>
                        |
                        <li><a href="#">Comics</a></li>
                    </ul>
                </div>
            </div>
           
        </header>
    )
}

export default AppHeader;
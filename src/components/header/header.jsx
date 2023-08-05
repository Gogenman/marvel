const Header = () => {
    // styles
    const header = "bg-[var(--main-bg-color)] text-[var(--main-text-color)]"
    const header_inner = "flex justify-between px-1 py-3"
    const header_link = "mr-2 cursor-pointer hover:text-[var(--second-text-color)] transition-all ease-in"
    return ( 
        <header className={header}>
            <div className="container">
                <div className={header_inner}>
                    <h3>Marvel</h3>
                    <ul className="flex">
                        <li className={header_link}>characters</li>
                        <li className={header_link}>comics</li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
 
export default Header;
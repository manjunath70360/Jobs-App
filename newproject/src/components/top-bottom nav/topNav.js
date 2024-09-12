import "./index.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const TopNav = ()=>{
    return(
        <div className='nav-bar'>
        <Link className="link" to={"/"}><h2 className='app-text'>JOBS</h2></Link>
         <div className='laptop-btns'>
           <Link className="link" to={"/"}><h2 className='app-text'>Home</h2></Link>
           <Link className="link" to={"/bookmarks"}><h2 className='app-text'>Bookmarks</h2></Link>
         </div>
        </div>
    )
}

export default TopNav
import "./index.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaHome } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";

const BottomNav = ()=>{
    return(
        <div className='btn-container'>
        <Link className="link" to={"/"}><button className='btns'><FaHome size={18} className='home-icon'/> Jobs</button></Link>
        <Link className="link" to={"/bookmarks"}><button className='btns btn1'><IoBookmarksSharp className='home-icon' size={18}/> Bookmarks</button></Link>
        </div>
    )
}
export default BottomNav
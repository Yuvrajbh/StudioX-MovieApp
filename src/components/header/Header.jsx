
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from '../../assets/x.png'
import "./style.scss"
// import { useNavigate } from "react-router-dom";

const Header = () => {

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setquery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlnavbar = () => {

    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide')
      }
      else {
        setShow('show')
      }

    }
    else {
      setShow('top')
    }
    setLastScrollY(window.scrollY)

  }
  useEffect(()=>{
    window.scrollTo(0,0)

  },[location])
  useEffect(() => {
    window.addEventListener('scroll', controlnavbar)
    return () => {
      window.removeEventListener('scroll', controlnavbar)
    }
  }, [lastScrollY])


  const opensearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const openmobilemenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const searchqueryhandler = (e) => {

    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`)
    }

  }

  const navigationhandler = (type) => {

    if (type === 'movie')
      navigate('/explore/movie')
    else
      navigate('/explore/tv')
    setMobileMenu(false)
  }


  return (
    <header className={`header ${mobileMenu ? "mobileView open" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} style={{width:'163.5', height:'50'}} onClick={()=>navigate("")} alt="" />
        </div>
        <ul className="menuitems">
          <li className="menuitem" onClick={() => navigationhandler('movie')}>Movies</li>
          <li className="menuitem" onClick={() => navigationhandler('tv')}>TV Shows</li>
          <li className="menuitem searchIcon" onClick={opensearch}  ><HiOutlineSearch /></li>
        </ul>
        <div className="mobilemenuitems">
          <HiOutlineSearch onClick={opensearch} /> 
          {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openmobilemenu} />)}

        </div>
      </ContentWrapper>
      {showSearch && <div className="searchbar">
        <ContentWrapper>
          <div className="searchcontent">
            <input type="text" placeholder='Search for your favourite Movie or TV show...' style={{ color: 'white' }}
              onChange={(e) => setquery(e.target.value)}
              onKeyUp={searchqueryhandler} 
          
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />

          </div>
        </ContentWrapper>


      </div>}
    </header>
  );
};

export default Header

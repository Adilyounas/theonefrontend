
// *{<------------------- React Basc -------------------------->}
import React from 'react'

// *{<------------------------------- File Css ------------------------------------->}
import "./pageNotFound.css"

// *{<------------------------------- TITLE OF PAGE ------------------------------------->}
import Titles from "../MetaData/MetaData"

// {<------------------------------- Commenting ------------------------------------->}

const PageNotFound = ({mode}) => {
  return (
    <div style={{backgroundColor:mode?"#000000":"",color:mode?"#ffffff":""}} className='pageNotFoundContainer'>
    <Titles title={"404 Page Not Found"} />
        <h1>404 Page Not Found </h1>
    </div>
  )
}

export default PageNotFound
 import React from "react";
 const ErrorImage = ({url, ...props}) => {
return(
<img alt="" {...props} src={url} onError={(e)=> {
       e.target.onerror = null; 
       e.target.src="https://i2.wp.com/www.stargazersworld.com/wordpress/wp-content/uploads/2010/11/2032275917.gif?resize=250%2C283&ssl=1"}}/>
   )
   }
export default ErrorImage;
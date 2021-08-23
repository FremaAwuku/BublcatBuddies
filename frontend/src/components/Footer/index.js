import './Footer.css'


const Footer = () =>{

    return (
        <>
        <ul className="footer">

        <li>
        < a  className="gitHub"  href ="https://github.com/FremaAwuku">


            <h4 ><i style={{color:"white" , margin:0, textDecoration:"none", fontSize:24, padding:5} }  className="fab fa-github" >GitHub</i></h4>


            </a>
        </li>
        <li>
        < a className="a-links, linkedIn" href ="https://github.com/FremaAwuku">

            <h4><i style={{color:"white", margin:0, textDecoration:"none", fontSize:24, padding:5,}} class="fab fa-linkedin">LinkedIn</i></h4>


            </a>
        </li>


        </ul>
        </>
    )

}
 export default Footer

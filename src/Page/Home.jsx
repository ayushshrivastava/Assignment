
import { Link } from "react-router-dom"
import Brain from "../icons/Brain"
import Timer from "../icons/Timer"
import Trophy from "../icons/Trophy"
import Button from "../components/Button"
import Card from "../components/Card"

export default function Home(){
    return(
        
        <div className="min-w-screen justify-center items-center flex flex-col mt-20">
          <div className="flex flex-col items-center justify-center">
           <div className="font-white">
            <Brain width={120} height={70} />
           </div>
           <div className="text-center flex flex-col items-center justify-center mt-4 ">
             <h1 className="text-6xl font-semibold text-white">Test Your Knowledge</h1>
             <p className="text-xl mt-4 text-white">Challenge yourself with our interactive quiz platform. Learn, grow, 
              <br/>
               and track your progress as you master new topics.</p>
           </div>
           <div className="flex gap-8"> 
           <Link to={"/quiz"} > <Button title={"start Quize Know"} color={"purple"}  /></Link>
                <Link to={"/history"} > <Button  title = {"View History"} /> </Link>
           </div>
           </div>

       </div>
    
    )
}
import Brain from "../icons/Brain"
import Button from "../components/Button"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="max-w-5xl mx-auto flex flex-row justify-between p-4 align-baseline">
      <div className="flex items-center gap-2 text-xl md:text-4xl font-bold text-white ">
        <Brain width={80} height={60} />
        Quiz
      </div>
      <div className="-mt-4">
        <Link to="/">
          <Button title={"Back Home"} color={"red"} />
        </Link>
      </div>
    </div>
  )
}

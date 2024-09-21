import { Goods, MainScreen } from "../../components/user/home"
import NewsGoods from "../../components/user/home/NewsGoods"

const Home = () => {
  return (
    <div>
      <MainScreen />
      <Goods />
      <NewsGoods />
    </div >
  )
}

export default Home
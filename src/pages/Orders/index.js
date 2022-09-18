import { useContext } from "react"
import AppContext from "../../context"
import OrderReportCard from "../../components/OrderReportCard";


export default function Orders() {

    const {orders} = useContext(AppContext);



  return (
    
    <div className="lol">
        {orders.map(order => {
            return <OrderReportCard key={order.id} {...order}/>
        })}

       



    </div>
  )
}

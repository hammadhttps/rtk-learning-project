import { useSelector,useDispatch }   from "react-redux";
import { add,subtract }  from "../app/features/counter/counterSlice";

const Counter = () => {

const count=useSelector((state)=>state.counter.value)
const dispatch=useDispatch();

  return (
    <div>
        <h1>Counter</h1>
        <h2>{count}</h2>
        <button onClick={()=>dispatch(add())}>Add</button>
        {count<=0?<button disabled>Subtract</button>:
        <button onClick={()=>dispatch(subtract())}>Subtract</button>}
    </div>
  )
}

export default Counter
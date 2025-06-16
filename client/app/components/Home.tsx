import Heading from "./Heading";
import TodoCard from "./TodoCard";
import Todos from "./Todos";

function Home() {
  return (
    <div className="my-10 mx-5">
      <Heading />
      <TodoCard />
      <Todos />
    </div>
  );
}
export default Home;

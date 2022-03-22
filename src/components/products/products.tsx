import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();
  return (
    <>
      <h2>Products Page</h2>
      <div>{category}</div>
    </>
  );
}
export default Products;

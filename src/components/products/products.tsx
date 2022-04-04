import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();
  return (
    <section className="default-page">
      <h2>Products Page</h2>
      <div>{category}</div>
    </section>
  );
}
export default Products;

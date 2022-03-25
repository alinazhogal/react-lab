import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();
  return (
    <section style={{ height: "76vh", flexDirection: "column", justifyContent: "flex-start" }}>
      <h2>Products Page</h2>
      <div>{category}</div>
    </section>
  );
}
export default Products;

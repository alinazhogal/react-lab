import Button from "@/elements/button";
import useLoader from "@/helpers/useLoader";
import { RootState } from "@/redux";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../home/games/gameCard";
import { Layout } from "../home/games/games.types";
import EditCardForm from "../modal/forms/editCard";
import Modal from "../modal/modal";
import { Search } from "../../elements/search";
import Filters from "./filters";
import styles from "./products.module.scss";

function Products() {
  const [search, setSearch] = useState<string>();
  const [editOpen, setEditOpen] = useState(false);
  const Loader = useLoader();
  const { isFilterLoading, games } = useSelector((state: RootState) => state.games);
  const { role } = useSelector((state: RootState) => state.auth);

  const isAdmin = role === "admin";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const gamesArr = useMemo(
    () => games.map((game) => <GameCard key={game.id} {...game} layout={Layout.Grid} />),
    [games]
  );

  const openModal = () => setEditOpen(true);

  const closeModal = () => setEditOpen(false);

  return (
    <section>
      <div className={`section-content ${styles.productsPage}`}>
        <Filters search={search} />
        <div className={styles.main}>
          <div className={styles.addCardSearch}>
            <Search value={search || ""} onChange={handleChange} styleAdd="products" />
            {isAdmin && <Button title="Add product" onClick={openModal} />}
          </div>
          <div className={styles.productsContainer}>
            <Loader isLoading={isFilterLoading}>
              {gamesArr.length !== 0 ? gamesArr : <h3 className="no-data">No games found</h3>}
            </Loader>
          </div>
        </div>
        <Modal title="Edit card" isOpen={editOpen} onClose={closeModal}>
          <EditCardForm onClose={closeModal} action="add" />
        </Modal>
      </div>
    </section>
  );
}
export default Products;

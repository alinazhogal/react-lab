import Loader from "@/elements/loader";
import { RootState } from "@/redux";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Layout } from "./games.types";

const GameCard = lazy(() => import("./gameCard"));

export default function GamesContainer() {
  const { games } = useSelector((state: RootState) => state.games);

  const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={Layout.Grid} />);

  return <React.Suspense fallback={<Loader />}>{gamesArr}</React.Suspense>;
}

/* eslint-disable react/function-component-definition */
import Loader from "@/elements/loader";

function useLoader() {
  return ({ isLoading, children }: { isLoading: boolean; children: JSX.Element[] | JSX.Element }) => (
    <>
      {isLoading && <Loader />}
      {!isLoading && children}
    </>
  );
}
export default useLoader;

import { useDispatch, useSelector } from "react-redux";
import { NavLinkProps, NavLink } from "react-router-dom";
import { RootState } from "@/redux";
import setSignInOpen from "@/redux/actions/modalActions";
import { memo } from "react";

function PrivateLink({
  children,
  activeCn,
  passiveCn,
  ...navLinkProps
}: NavLinkProps & {
  // eslint-disable-next-line react/require-default-props
  activeCn?: string;
  passiveCn: string;
}) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleLinkClick = (link: string) => {
    dispatch(setSignInOpen(true, link));
  };

  if (!isAuth) {
    return (
      <NavLink
        {...navLinkProps}
        className={passiveCn}
        to="#"
        onClick={() => handleLinkClick(navLinkProps.to as string)}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <NavLink {...navLinkProps} className={({ isActive }) => (isActive && activeCn ? activeCn : passiveCn)}>
      {children}
    </NavLink>
  );
}

export default memo(PrivateLink);

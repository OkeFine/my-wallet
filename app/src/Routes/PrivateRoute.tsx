import { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { StoreContext } from "../StoreContext";

type TProps = {
  path: string;
  Layout?: FC<any>;
  Component: FC<any>;
};

export default function PrivateRoute({
  Layout = MainLayout,
  Component,
  ...rest
}: TProps) {
  const [state] = useContext(StoreContext);
  if (!state.token) {
    return <Redirect to="/unlock" />;
  }
  return (
    <Route
      {...rest}
      render={(matchProps: any) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
}

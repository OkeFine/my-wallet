import { FC } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

type TProps = {
  path: string;
  Layout?: FC<any>;
  Component: FC<any>;
};

export default function PublicRoute({
  Layout = MainLayout,
  Component,
  ...rest
}: TProps) {
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

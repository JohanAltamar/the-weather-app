import classNames from "classnames";

import Header from "../navigation/Header";

interface PageLayoutProps {
  className?: string;
  wrapperClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  wrapperClassName,
}) => {
  return (
    <div className={classNames("h-screen flex flex-col", wrapperClassName)}>
      <Header />
      <main className={classNames("flex-1", className)}>{children}</main>
    </div>
  );
};

export default PageLayout;

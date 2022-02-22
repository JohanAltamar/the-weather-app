import Header from "../Header";

interface PageLayoutProps {
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-300 h-screen">
      <div className="max-w-sm mx-auto bg-white h-full flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto scrollbar">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;

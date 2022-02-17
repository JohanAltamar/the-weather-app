interface PageLayoutProps {
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-300 h-screen">
      <main className="max-w-sm mx-auto bg-white h-full">{children}</main>
    </div>
  );
};

export default PageLayout;

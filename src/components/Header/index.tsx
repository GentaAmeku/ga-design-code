import CustomizeMenu from "./components/CustomizeMenu";
import GithubLink from "./components/GithubLink";

const Header = () => {
  return (
    <header className="w-full bg-background z-10">
      <div className="container mx-auto flex h-[var(--custom-header-height)] items-center justify-end px-4 md:px-6">
        <CustomizeMenu />
        <GithubLink />
      </div>
    </header>
  );
};

export default Header;

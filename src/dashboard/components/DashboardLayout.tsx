interface Props {
  logout: () => void;
}

const DashboardLayout = ({ logout }: Props) => {
  return (
    <>
      <div className="dashboard">
        <aside className="sidebar">Sidebar</aside>

        <div className="main">
          <div className="topbar">
            <header>Top Banner</header>
            <button onClick={logout}>Logout</button>
          </div>
          <section className="content">Main Content</section>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

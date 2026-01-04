import React from "react";

interface Props {
  onClick: () => void;
}

const Dashboard = ({ onClick }: Props) => {
  return (
    <div>
      Dashboard
      <button onClick={onClick}>Log Out</button>
    </div>
  );
};

export default Dashboard;

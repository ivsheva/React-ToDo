import React from "react";

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button
        style={{ marginTop: "12px", padding: "8px 48px" }}
        className="btn btn-primary"
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  );
};

export default Button;

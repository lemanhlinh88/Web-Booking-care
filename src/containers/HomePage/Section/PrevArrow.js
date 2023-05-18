const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        width: "44px",
        height: "44px",
      }}
      onClick={onClick}
    />
  );
};

export default PrevArrow;

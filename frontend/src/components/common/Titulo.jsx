const Title = ({ text , className}) => {
  return (
    <h1 className={`text-2xl text-texto font-titulo ${className}`}>
      {text}
    </h1>
  );
};

export default Title;

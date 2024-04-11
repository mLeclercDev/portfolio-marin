const currentYear = new Date().getFullYear();

const Footer = ({word, description, informations}) => {
  return (
    <footer>
        <p>
            {word}
        </p>
        <p className='description'>
            {description}
        </p>
        <div className='informations'>
            {informations.map((info, index) => (
                <div key={index}>{info}</div>
            ))}
            <div>{currentYear}</div>
        </div>
    </footer>
  );
};

export default Footer;
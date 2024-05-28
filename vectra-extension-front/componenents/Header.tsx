import icon from '../assets/icon.png';

const Header = () => {
    return ( 
    <header className="justify-center items-center relative top-20 block">
        <img src={icon} alt="Icon" width={"48px"} className="block mx-auto" />
        <h2 className="text-center font-semibold text-3xl text-indigo-400 block relative top-5  ">One step is all you need </h2>
    </header>
     );
}
 
export default Header;
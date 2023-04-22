import logo from '../images/logo-mesto.svg';

export default function Header() {
    return(
    <div className="header">
        <img src={logo} alt="логотип Место" className="header__logo" />
    </div>
    )
}
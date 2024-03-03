export default function Header({ setDarkMode }) {

    function handleDarkMode() {
        setDarkMode(darkMode => !darkMode);
        if (localStorage.getItem('darkMode') === 'true') {
            localStorage.setItem('darkMode', 'false');
        } else {
            localStorage.setItem('darkMode', 'true');
        }
    }

    return (
        <div className="lightDark">
            <img src="/images/light-mode-icon.svg" alt="Light Mode Icon" />
            <div onClick={handleDarkMode} className="switchContainer">
                <img src="/images/ellipse-10.svg" />
            </div>
            <img src="/images/dark-mode-icon.svg" alt="Dark Mode Icon" />
        </div>
    )
}
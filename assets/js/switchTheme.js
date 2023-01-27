// https://stackoverflow.com/questions/60037491/how-to-save-cookies-for-dark-light-mode-toggle
(function(){
    let storedTheme = localStorage.getItem("data-theme");
    if(storedTheme){
        let root = document.head.parentElement;
        root.setAttribute('data-theme', storedTheme)
    }
})();

function switchTheme(){
    let root = document.body.parentElement;
    if(root.getAttribute('data-theme')=="light"){
        root.setAttribute('data-theme', 'dark')
        localStorage.setItem('data-theme', 'dark')
    }else{
        root.setAttribute('data-theme', 'light')
        localStorage.setItem('data-theme', 'light')
    }
}
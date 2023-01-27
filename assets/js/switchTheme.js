function switchTheme(){
    let root = document.body.parentElement;
    if(root.getAttribute('data-theme')=="light"){
        root.setAttribute('data-theme', 'dark')
    }else{
        root.setAttribute('data-theme', 'light')
    }
}
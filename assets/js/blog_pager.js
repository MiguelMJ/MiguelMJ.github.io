const posts_per_page = 10
let blog_page = 1
function set_blog_page(page){
    let page_selectors = document.getElementsByClassName("page-selector")
    Object.values(page_selectors).forEach(p => p.classList.remove('w3-black'))
    page_selectors[page-1].classList.add('w3-black')
    let posts = document.getElementsByClassName("post-card")
    for(let i = 0; i < posts.length; i++){
        let x = i - posts_per_page * (page-1)
        if(x >= 0 && x < posts_per_page){
            posts[i].style.display = "block"
        }else{
            posts[i].style.display = "none"
        }
    }
    window.scrollTo(0,0)
    blog_page = page
}
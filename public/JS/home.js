function updateImages(){
    let img1 = document.getElementById("img1")
    let img2 = document.getElementById("img2")
    let img3 = document.getElementById("img3")
    let img4 = document.getElementById("img4")

    if(window.innerWidth >= 1042){
        img1.src = "./Images/image1.webp"
        img2.src = "./Images/image2.jpg"
        img3.src = "./Images/image3.jpg"
        img4.src = "./Images/image4.jpg"

    }else if(window.innerWidth >= 787){
        img1.src = "./Images/image1.webp"
        img2.src = "./Images/image2.jpg"
        img3.src = "./Images/image4.jpg"
        img4.src = "./Images/image3.jpg"

    }else{
        img1.src = "./Images/image1.webp"
        img2.src = "./Images/image4.jpg"
        img3.src = "./Images/image3.jpg"
        img4.src = "./Images/image2.jpg"
    }
}

window.onload = updateImages
window.onresize = updateImages
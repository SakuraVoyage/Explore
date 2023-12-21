const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");
const tabMenu = document.querySelector(".tab-menu");
const tabs = document.querySelectorAll(".tab");
const tabBtns = document.querySelectorAll(".tab-btn");

const iconVisibility = () => {
    const scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    const scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;

    btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
    btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
};

const tab_Nav = (tabBtnClick) => {
    tabBtns.forEach((tabBtn, i) => {
        tabBtn.classList.toggle("active", i === tabBtnClick);
        tabs[i].classList.toggle("active", i === tabBtnClick);
    });
};

btnRight.addEventListener("click", () => {
    tabMenu.scrollLeft += 150;
    setTimeout(iconVisibility, 50);
});

btnLeft.addEventListener("click", () => {
    tabMenu.scrollLeft -= 150;
    setTimeout(iconVisibility, 50);
});

window.onload = () => {
    iconVisibility(); 
    btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
};

window.onresize = () => {
    iconVisibility();
    btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
};

let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
    if (!activeDrag) return;
    tabMenu.scrollLeft -= drag.movementX;
    iconVisibility();
    tabMenu.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    activeDrag = false;
    tabMenu.classList.remove("dragging");
});

tabMenu.addEventListener("mousedown", () => {
    activeDrag = true;
});

tabBtns.forEach((tabBtn, i) => {
    tabBtn.addEventListener("click", () => {
        tab_Nav(i);
    });
});

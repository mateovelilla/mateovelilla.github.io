function refreshTheme() {
    updateTheme();
    document.querySelectorAll(".themes-menu").forEach((element) => {
        document.addEventListener("click", () =>
            element.classList.remove("open")
        );
    });
    document.querySelectorAll(".theme-toggle-btn").forEach((element) => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".themes-menu").forEach((themesMenu) => {
                const isClosed = !themesMenu.classList.contains("open");
                themesMenu.classList[isClosed ? "add" : "remove"]("open");
            });
        });
    });
    document.querySelectorAll(".themes-menu-option").forEach((element) => {
        element.addEventListener("click", (e) => {
            localStorage.setItem(
                "theme",
                e.target.innerText.toLowerCase().trim(),
            );
            updateTheme();
        });
    });
}
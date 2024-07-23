let remove = null;
const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
const getThemePreference = () => {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem("theme") ?? "system";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};
const updateIcon = (themePreference) => {
    const elements = document.querySelectorAll(".theme-toggle-icon");
    elements.forEach((element => {
        element.style.scale = element.id === themePreference ? "1" : "0";
    }))
};
const updateTheme = () => {
    if (remove != null) {
        remove();
    }
    matchMedia.addEventListener("change", updateTheme);
    remove = () => {
        matchMedia.removeEventListener("change", updateTheme);
    };

    const themePreference = getThemePreference();
    const isDark =
        themePreference === "dark" ||
        (themePreference === "system" && matchMedia.matches);

    updateIcon(themePreference);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
};
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
let theme=localStorage.getItem("Theme");theme||(theme=matchMedia("(prefers-color-scheme: dark)").matches?"Dark":"Light",localStorage.setItem("Theme",theme));"Dark"===theme?document.documentElement.classList.add("dark"):void 0;
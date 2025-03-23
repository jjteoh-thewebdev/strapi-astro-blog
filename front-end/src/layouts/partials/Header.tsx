import { useEffect } from "react";

export default function NavigationBarAnimation() {
  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const header = document.querySelector(`.header`);

    window.addEventListener("load", (event) => {
      if (viewportWidth < 768) {
        header?.classList.add("bg-white");
        header?.classList.remove("bg-transparent");
        header?.classList.remove("shadow-lg");
      }
    });

    if (viewportWidth < 768) {
      header?.classList.add("bg-white");
      header?.classList.remove("bg-transparent");
      header?.classList.remove("shadow-lg");
    } else {
      /**
       * when viewport at top most, header should be transparent
       * when user scroll down, the header background should follow bg-primary
       */

      window.addEventListener(`scroll`, function () {
        const scrollPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        const header = document.querySelector(`.header`);

        if (scrollPosition > 50) {
          header?.classList.remove(`bg-tranparent`);
          header?.classList.add(`bg-white`);
          header?.classList.add(`shadow-lg`);
        } else {
          header?.classList.add(`bg-tranparent`);
          header?.classList.remove(`bg-white`);
          header?.classList.remove(`shadow-lg`);
        }
      });
    }
  }, []);

  return null; // No UI, only a script
}

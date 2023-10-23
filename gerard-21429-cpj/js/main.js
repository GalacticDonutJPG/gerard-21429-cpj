// place js in here

window.onload = () => {
  let all = document.getElementsByClassName("zoom"),
    lightbox = document.getElementById("lightbox");

  if (all.length > 0) {
    for (let i of all) {
      i.onclick = () => {
        let clone = i.cloneNode();
        clone.className = "";
        lightbox.innerHTML = "";
        lightbox.appendChild(clone);
        lightbox.className = "show";
      };
    }
  }

  lightbox.onclick = () => {
    lightbox.className = "";
  };
};

document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

function scrollToTop() {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}

function initHamburgerMenu() {
  /* initialise Hamburger-Menu */
  const hamburger = document.querySelector(".main__nav-ham");
  const navMenu = document.querySelector(".main__nav-list");
  const title = document.querySelector(".main__nav-title");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

initHamburgerMenu();

/**
 * Load JSON from HTML like this
 * loadJSON('my-file.json',
 *       function(data) { console.log(data); },
 *       function(xhr) { console.error(xhr); }
 * );
 *
 * @param {*} path
 * @param {*} success
 * @param {*} error
 */
function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

function generateRepoItemsFrom(theData) {
  const items = Object.keys(theData);
  items.forEach((el0) => {
    const in0 = theData[`${el0}`];
    const headline = `${el0.charAt(0).toUpperCase()}${el0.slice(1)}`;
    const id = `repo-${el0}`;
    let result = `<h2>${headline}</h2>`;
    in0.forEach((el) => {
      const push = `<ul class="repo__list"><li class="repo__item"><ul>`;
      const thumbnail = `<li><img src="/assets/images/repo/${el.thumbnail}" /></li>`;
      const l0 = `<br><a href="${el.link}" target="_blank">link</a>`;
      const link = el.link?.length > 0 ? l0 : "";
      const r0 = `${el.title}`;
      const r1 = `${el.reference}`;
      const r2 = `${link}`;
      const reference = `<li><p>${r0}<br>${r1}${r2}</p></li>`;
      const description = `<li><p>${el.description}</p></li>`;
      const pop = `</li></ul></ul>`;
      result += `${push}${thumbnail}${reference}${description}${pop}`;
    });
    document.getElementById(id).innerHTML = result;
  });
}

function logErrorMessage(theError) {
  console.error(theError);
}
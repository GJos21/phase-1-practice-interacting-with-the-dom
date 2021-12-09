
// when paused is true, ignore button clicks, escept puase button
let paused = false;

// likes is an array of objects of like counts
const likes = [];

// counter function returns an object with 2 functions to increment and decrement the counter
const counter = function () {
  let num = 0;
  return {
    incr: () => ++num,
    decr: () => num > 0 ? --num : num
  }

}();

// timer function provides 2 functions to start (resume) and stop (pause) the timer
const timer = function () {
  let interval;
  return {
    stop: () => clearInterval(interval),
    // set interval at 1 second and call counting function to increment counter
    start: () => interval = setInterval(counting, 1000)
  }

}();

function counting() {
  document.getElementById("counter").textContent = counter.incr();

}

// looks at button label to determine whether to pause or resume the counter
function manageCounter(e) {
  const btn = document.getElementById("pause")

  if (btn.textContent === " pause ") {
    timer.stop();
    btn.textContent = " resume ";
  } else {
    timer.start();
    btn.textContent = " pause ";
  }
  paused = !paused;

}

// manages and renders array of likes
function manageLikes(e) {

  const ul = document.querySelector(".likes");
  const currentCount = document.getElementById("counter").textContent;
  let existingLike;

  // find if user has already liked this counter
  existingLike = likes.find(like => like.countLiked === currentCount);

  // if found, increment, otherwise add the new like to the likes array
  if (existingLike) {
    existingLike.howMany += 1;
  } else {
    existingLike = { countLiked: currentCount, howMany: 1 }
    likes.push(existingLike);
  }

  // user may have decremented counter and likes the same counter multiple times
  // instead of trying to indetify the exact counter that have beeb liked, simply
  //  render the whole array again
  ul.innerHTML = "";  // clear the DOM likes list

  // render the list 
  likes.forEach(like => {
    let li = document.createElement("li");
    li.textContent = `${like.countLiked} has been liked ${like.howMany} times.`
    ul.append(li);
  });
}

function renderComment(e) {
  const div = document.getElementById("list");
  const comment = document.getElementById("comment-input").value;
  const p = document.createElement("p");

  e.preventDefault();
  p.textContent = comment;
  div.appendChild(p);
  e.target.reset();
}

// clickHandler is a traffic cop directing the button click to the appropriate handler
function clickHandler(e) {

  if (e.target.id === "pause") {
    manageCounter(e);
  } else if (!paused) {
    if (e.target.id === "plus") {
      counter.incr();
    } else if (e.target.id === "minus") {
      counter.decr();
    } else if (e.target.id === "heart") {
      manageLikes(e);
    } else if (e.target.id === "comment-form") {
      renderComment(e);
    }
  }

}

// add all the event listeners
document.getElementById("pause").addEventListener("click", clickHandler);
document.getElementById("minus").addEventListener("click", clickHandler);
document.getElementById("plus").addEventListener("click", clickHandler);
document.getElementById("heart").addEventListener("click", clickHandler);
document.getElementById("comment-form").addEventListener("submit", clickHandler);

// start the timer
timer.start();





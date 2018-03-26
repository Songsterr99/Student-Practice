listener();

function listener(){

  document.getElementById("exit").addEventListener("click", displayDate);
  function displayDate() {
      document.getElementById("hi").innerHTML = "<section class="error404"><div class="_404">404</div><h2>Oops, something went wrong</h2><a class="error404-button" href="#">Home page</a></section>";
  }
}

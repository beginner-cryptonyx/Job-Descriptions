// Grabbing elements
const header = document.getElementById("type");
const output_activator = document.getElementById("sub");
const output_cont = document.getElementById("output-container");
const reset_btn = document.getElementById("reset_btn");
const loader = document.getElementById("loader");

// Recursive Function to update the typewriter
function txtupdate() {
  setTimeout(() => {
    header.remove();
    header.innerHTML = "‎ The Perfect Job Description.";
    document.getElementById("wel").appendChild(header);
  }, 500);

  setTimeout(() => {
    header.remove();
    header.innerHTML = "‎ Resume Points.";
    document.getElementById("wel").appendChild(header);
  }, 5000);

  setTimeout(() => {
    header.remove();
    header.innerHTML = "‎ What You Know.";
    document.getElementById("wel").appendChild(header);
  }, 10000);
  setTimeout(txtupdate, 15250);
}

txtupdate();

// Checks if the form has been submitted and sends request to python server to update variable reserable to true
output_activator.addEventListener("click", () => {
  fetch("/resetable_update_true")
    .then((response) => {
      if (response.ok) {
        console.log("Resetable updated to TRUE successfully");
      } else {
        console.log("Failed to update resetable");
      }
    })
    .catch((error) => {
      console.error("Error while updating resetable:", error);
    });
  loader.classList.remove("hidden");
});

// Check if the user want another generated reponse, sends request to update variable resetable to False
reset_btn.addEventListener("click", () => {
  fetch("/resetable_update_false")
    .then((response) => {
      if (response.ok) {
        console.log("Resetable updated to FALSE successfully");
      } else {
        console.log("Failed to update resetable");
      }
    })
    .catch((error) => {
      console.error("Error while updating resetable:", error);
    });
  loader.classList.remove("hidden");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});

// This is a check to find out if the user is on the form enter page or the view output page
document.addEventListener("DOMContentLoaded", function () {
  fetch("/get_resetable")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data == "True") {
        document.getElementById("quest").style.display = "none";
        output_activator.classList.add("hidden");
        output_cont.classList.remove("hidden");
        output_cont.style.display = "flex";
        fetch("/output")
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            document.getElementById("output").innerHTML = data.content;
          });
      } else if (data == "False") {
        document.getElementById("quest").style.display = "grid";
        output_activator.classList.remove("hidden");
        output_cont.classList.add("hidden");
        output_cont.style.display = "none";
      }
    });
});

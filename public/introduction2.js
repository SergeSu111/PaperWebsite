const nextButton = document.querySelector("#next_page");
const lastButton = document.querySelector("#last_page");

nextButton.addEventListener("click", function()
{
    window.location.href = "report.html";
});


lastButton.addEventListener("click", function()
{
    window.location.href = "introduction.html";
});
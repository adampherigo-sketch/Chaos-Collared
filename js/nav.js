const navigationContainer =
  document.getElementById(
    "navigation-container"
  );

if (navigationContainer) {

  fetch("components/navigation.html")

    .then(response => response.text())

    .then(data => {

      navigationContainer.innerHTML = data;

    })

    .catch(error => {

      console.error(
        "Navigation failed to load:",
        error
      );

    });

}
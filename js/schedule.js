(function () {
  "use strict";

  var tbody = document.getElementById("schedule-tbody");
  if (!tbody || !window.OREGON_LEAGUE_EVENTS) return;

  window.OREGON_LEAGUE_EVENTS.forEach(function (event) {
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" + event.date + "</td>" +
      "<td>" + event.name + "</td>" +
      "<td>" + event.venue + "</td>" +
      "<td>" + event.notes + "</td>";
    tbody.appendChild(row);
  });
})();

document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get(["analysisData"], function (data) {
        let analysisTable = document.getElementById("analysisTable");

        if (data.analysisData && data.analysisData.length > 0) {
            data.analysisData.forEach((entry) => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${entry.absentCount}</td><td>${entry.newAttendance}%</td>`;
                analysisTable.appendChild(row);
            });
        } else {
            analysisTable.innerHTML = "<tr><td colspan='2'>No data available</td></tr>";
        }
    });
});

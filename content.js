function waitForElement(selector, callback) {
    let checkExist = setInterval(() => {
        let element = document.querySelector(selector);
        if (element) {
            clearInterval(checkExist);
            callback(element);
        }
    }, 500);
}

// Extract Subject-wise Attendance
function fetchAttendance() {
    waitForElement("#ContentPlaceHolder1_gvStdHistory", () => {
        let subjects = [];
        let totalClasses = 0, attendedClasses = 0;
        let rows = document.querySelectorAll("#ContentPlaceHolder1_gvStdHistory tr");

        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row

            let cols = row.querySelectorAll("td");
            if (cols.length > 0) {
                let subject = cols[1].innerText.trim();
                let total = parseInt(cols[2].innerText.trim());
                let attended = parseInt(cols[3].innerText.trim());
                let percentage = parseFloat(cols[4].innerText.trim().replace("%", ""));

                subjects.push({ subject, total, attended, percentage });

                totalClasses += total;
                attendedClasses += attended;
            }
        });

        console.log("Subject-wise Attendance:", subjects);
        console.log("Total Held:", totalClasses, "Total Present:", attendedClasses);

        chrome.storage.local.set({
            totalHeld: totalClasses,
            totalPresent: attendedClasses
        });
    });
}

// 📌 Automatically fetch attendance when script loads
fetchAttendance();

let globalEndDate, globalHolidays;

document.addEventListener("DOMContentLoaded", function () {
    let periodsPerDayInput = document.getElementById("periodsPerDay");
    let saveButton = document.getElementById("savePeriods");
    let calculateButton = document.getElementById("calculate");
    let currentPresentElem = document.getElementById("currentPresent");
    let currentHeldElem = document.getElementById("currentHeld");
    let erpAttendanceElem = document.getElementById("erpAttendance");
    let outputElem = document.getElementById("output");
    let startDateInput = document.getElementById("startDate");
    let viewAnalysisButton = document.getElementById("viewAnalysisButton");
    let analysisTable = document.getElementById("analysisTable");
    let backButton = document.getElementById("backButton");

    // ✅ Load saved periods per day from storage
    chrome.storage.local.get(["periodsPerDay", "totalHeld", "totalPresent"], function (data) {
        if (data.periodsPerDay) {
            periodsPerDayInput.value = data.periodsPerDay;
        }

        if (data.totalHeld !== undefined && data.totalPresent !== undefined) {
            currentPresentElem.innerText = data.totalPresent;
            currentHeldElem.innerText = data.totalHeld;

            let attendancePercentage = (data.totalPresent / data.totalHeld) * 100;
            attendancePercentage = isNaN(attendancePercentage) ? 0 : attendancePercentage.toFixed(2);

            if (attendancePercentage > 80) {
                erpAttendanceElem.style.color = "#008000"; // Green
            } else if (attendancePercentage >= 75 && attendancePercentage <= 80) {
                erpAttendanceElem.style.color = "#FFA500"; // Yellow
            } else {
                erpAttendanceElem.style.color = "#FF0000"; // Red
            }

            erpAttendanceElem.innerText = `${attendancePercentage}%`;

            let today = new Date();
            startDateInput.value = (attendancePercentage === 0) ? today.toISOString().split("T")[0] : new Date(today.getTime() + 86400000).toISOString().split("T")[0];
        } else {
            currentPresentElem.innerText = "Not available";
            currentHeldElem.innerText = "Not available";
            erpAttendanceElem.innerText = "Not available";
        }
    });
    // ✅ Save periods per day and ensure the value persists
    saveButton.addEventListener("click", function () {
        let periodsPerDay = parseInt(periodsPerDayInput.value);

        if (!isNaN(periodsPerDay) && periodsPerDay > 0) {
            chrome.storage.local.set({ "periodsPerDay": periodsPerDay }, function () {
                alert("Saved successfully!");
            });
        } else {
            alert("Please enter a valid number of periods per day.");
        }
    });

    // ✅ Calculate allowed absences
    calculateButton.addEventListener("click", function () {
        let startDateInput = document.getElementById("startDate").value;
        let endDateInput = document.getElementById("endDate").value;
        let holidaysInput = document.getElementById("holidays").value;
    
        let startDate = new Date(startDateInput);
        globalEndDate = new Date(endDateInput); // Store globally
        let today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
    
        // 🛑 Check if the start date is today or in the future
        if (isNaN(startDate.getTime()) || startDate < today) {
            alert("⚠️ Error: Start date must be today or a future date.");
            return;
        }
    
        // 🛑 Check if the end date is valid
        if (isNaN(globalEndDate.getTime()) || globalEndDate < startDate) {
            alert("⚠️ Error: End date must be greater than or equal to the start date.");
            return;
        }
    
        // 🛑 Ensure that the number of holidays is entered and is a valid non-negative number
        if (holidaysInput === "" || isNaN(holidaysInput) || parseInt(holidaysInput) < 0) {
            alert("⚠️ Error: Please enter a valid number of holidays (0 or more).");
            return;
        }
    
        globalHolidays = parseInt(holidaysInput); // Store globally
        let futureDays = Math.floor((globalEndDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
        let futureWorkingDays = futureDays - globalHolidays;
    
        chrome.storage.local.get(["periodsPerDay", "totalHeld", "totalPresent"], function (data) {
            let periodsPerDay = parseInt(data.periodsPerDay || 0);
            let totalClasses = parseInt(data.totalHeld || 0);
            let attendedClasses = parseInt(data.totalPresent || 0);
    
            // 🛑 Ensure valid data for attendance calculations
            if (totalClasses === 0 || periodsPerDay === 0) {
                alert("⚠️ Error: Please enter valid numbers for periods per day and attendance data.");
                return;
            }
    
            let currentAbsences = totalClasses - attendedClasses;
            let futureWorkingClasses = futureWorkingDays * periodsPerDay;
            let totalExpectedClasses = totalClasses + futureWorkingClasses;
            let maxAllowedAbsences = Math.floor(totalExpectedClasses - 0.75 * totalExpectedClasses - currentAbsences);
    
            // Display max absences allowed
            let outputMsg;
            if (maxAllowedAbsences >= futureWorkingClasses) {
                outputMsg = `<p>You can be absent for <span style="color: green; font-weight: bold;">all</span> upcoming classes while maintaining 75% attendance.</p>`;
            } else {
                outputMsg = `<p>You can be absent for <span style="color: green; font-weight: bold;">${maxAllowedAbsences}</span> more classes in the selected period while maintaining 75% attendance.</p>`;
            }
    
            outputElem.innerHTML = outputMsg;
    
            // Show the "View Detailed Analysis" button
            viewAnalysisButton.style.display = "block";
        });
    });
    
    

    // ✅ Handle "View Detailed Analysis" button click
    viewAnalysisButton.addEventListener("click", function () {
        chrome.storage.local.get(["periodsPerDay", "totalHeld", "totalPresent"], function (data) {
            let periodsPerDay = parseInt(data.periodsPerDay || 0);
            let totalClasses = parseInt(data.totalHeld || 0);
            let attendedClasses = parseInt(data.totalPresent || 0);

            let futureDays = Math.floor((globalEndDate.getTime() - new Date(document.getElementById("startDate").value).getTime()) / (1000 * 3600 * 24)) + 1;
            let futureWorkingDays = futureDays - globalHolidays;
            let futureWorkingClasses = futureWorkingDays * periodsPerDay;

            // Generate attendance analysis table
            analysisTable.innerHTML = ""; // Clear previous data

            for (let absentClasses = futureWorkingClasses; absentClasses >= 0; absentClasses--) {
                let newPresent = attendedClasses + (futureWorkingClasses - absentClasses);
                let newAttendance = (newPresent / (totalClasses + futureWorkingClasses)) * 100;

                let row = document.createElement("tr");
                row.innerHTML = `<td>${absentClasses}</td><td>${newAttendance.toFixed(2)}%</td>`;
                analysisTable.appendChild(row);
            }

            // Show the analysis section and hide the main UI
            document.getElementById("mainContainer").classList.add("hidden");
            document.getElementById("analysisContainer").classList.remove("hidden");
        });
    });

    // ✅ Back Button to return to main UI
    backButton.addEventListener("click", function () {
        document.getElementById("mainContainer").classList.remove("hidden");
        document.getElementById("analysisContainer").classList.add("hidden");
    });
});

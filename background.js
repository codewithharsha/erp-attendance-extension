chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "OVERALL_ATTENDANCE") {
        console.log("Overall Attendance:", message.attendance);
        chrome.storage.local.set({ overallAttendance: message.attendance });
    }

    if (message.type === "SUBJECT_ATTENDANCE") {
        console.log("Received Subject-wise Attendance:", message.data);
        chrome.storage.local.set({ 
            subjectAttendance: message.data,
            totalHeld: message.totalHeld,
            totalPresent: message.totalPresent
         });
    }
    
    if (message.type === "MONTHLY_ATTENDANCE") {
        console.log("Received Monthly Attendance:", message.data);
        chrome.storage.local.set({ monthlyAttendance: message.data });

        let totalClasses = 0, attendedClasses = 0;
        message.data.forEach((month) => {
            totalClasses += month.totalClasses;
            attendedClasses += month.attendedClasses;
        });

        let requiredAttendance = 0.75 * totalClasses; // 75% threshold
        let maxAbsences = Math.floor((attendedClasses - requiredAttendance) / 0.75);

        console.log("Max Absences Allowed:", maxAbsences);

        chrome.storage.local.set({ maxAbsences });
    }

    // 📌 Force reload attendance when refresh button is clicked
    if (message.type === "REFRESH_ATTENDANCE") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: fetchAttendanceFromERP
                });
            }
        });
    }
});

// Function to fetch new attendance data
function fetchAttendanceFromERP() {
    chrome.runtime.sendMessage({ type: "FETCH_ATTENDANCE" });
}

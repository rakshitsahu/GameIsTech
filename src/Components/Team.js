export const TeamNamesJson = [
    {
        "FullName" : "Chennai Super Kings",
        "ShortName" : "CSK"
    },
    {
        "FullName" : "Delhi Capitals",
        "ShortName" : "DC"
    },
    {
        "FullName" : "Gujarat Titans",
        "ShortName" : "GT"
    },
    {
        "FullName" : "Kolkata Knight Riders",
        "ShortName" : "KKR"
    },
    {
        "FullName" : "Lucknow Super Giants",
        "ShortName" : "LSG"
    },
    {
        "FullName" : "Mumbai Indians",
        "ShortName" : "MI"
    },
    {
        "FullName" : "Punjab Kings",
        "ShortName" : "PK"
    },
    {
        "FullName" : "Punjab Kings",
        "ShortName" : "PBKS"
    },
    {
        "FullName" : "Rajasthan Royals",
        "ShortName" : "RR"
    },
    {
        "FullName" : "Royal Challengers Bangalore",
        "ShortName" : "RCB"
    },
    {
        "FullName" : "Sunrisers Hyderabad",
        "ShortName" : "SRH"
    },
    ]
    export function GetTeamNames(teamName) {
        for (let i = 0; i < TeamNamesJson.length; i++) {
            let teamNameJson = TeamNamesJson[i];
            if (teamNameJson["ShortName"].trim().toLowerCase() === teamName.trim().toLowerCase() || teamNameJson["FullName"].trim().toLowerCase() === teamName.trim().toLowerCase()) {
                return teamNameJson;
            }
        }

        return null;
    }
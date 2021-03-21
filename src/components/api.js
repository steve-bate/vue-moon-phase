export async function queryMoonPhases(config) {
    var gets = [];
    for (var i in config) {
        gets.push(i + "=" + encodeURIComponent(config[i]));
    }
    gets.push("LDZ=" + new Date(config.year, config.month - 1, 1) / 1000);
    const url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&");
    const response = await fetch(url);
    return await response.json();
}    

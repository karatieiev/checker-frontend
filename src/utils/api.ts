const url: String = "https://app-time-tracking.herokuapp.com";

export const getEmployees = (id: Number = 0): Promise<any> => {
    return fetch(`${url}/employees${id? "/"+id : ""}`)
        .then(result => {
            if (result.ok) return result.json();
            throw new Error("Error getting employees list");
        });
}

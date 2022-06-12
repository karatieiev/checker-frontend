export const getEmployees = (id: String = ''): Promise<any> => {
    return fetch(`${process.env.REACT_APP_URL}/employees${id? '/'+id : ''}`)
        .then(result => {
            if (result.ok) result.json();
            throw new Error("Error getting employees list");
        });
}

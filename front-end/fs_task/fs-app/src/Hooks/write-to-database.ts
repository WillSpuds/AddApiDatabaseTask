import DatabaseEntry from '../Types/DatabaseEntry';

const url = 'http://localhost:5001/api/database';

export async function writeToDatabase(obj: DatabaseEntry){
    const response = await fetch(url, {method: "post",  headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)})

    if (response.ok){
        return true;
    }

    console.error(await response.text);
    return false;
}

// unused function to get database contents whilst testing I was connecting to the api correctly - thought I'd leave it in if you're interested
// export async function getDatabaseContents(){
//     const response = await fetch(url, {method: "get"})
//     const databaseResponse = await response.json();
// }
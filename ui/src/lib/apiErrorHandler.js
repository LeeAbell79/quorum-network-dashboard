export function handleApiError(response) {
  return new Promise(function(resolve,reject){
    if(!response.ok) {
      response.json().then(function(err){
        reject(new Error(err.error.message));
      })
    }
    else {
      resolve(response);
    }
  })
}

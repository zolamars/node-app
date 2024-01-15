const p = Promise.resolve({id: 1})
p.then(result=> console.log(result))

const pErr= Promise.reject(new Error('reason for rejection...'))
pErr.catch(error => console.log(error))
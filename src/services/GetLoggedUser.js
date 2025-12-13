const getLoggedUser = async () => {
  let user = await fetch('https://localhost:7149/api/Users/getLoggedUser', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res =>
      res.json()
    )
    .then(async(result) => {
      return result
    },
      (error) => {
          return error
      });

  return user;
}

export default getLoggedUser;
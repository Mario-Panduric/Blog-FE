const getLoggedUser = async () => {
  let user = await fetch('http://localhost:5020/api/Users/getLoggedUser', {
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
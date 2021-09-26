# Day14 planing

- start server on port (5000)

- set up database connection (sequelize)

- make a model (User) -> {id, name, role, email, password}

- setup routes -> {register ,userLogin}

- setup working logic functions in controllers

  -> (register) -> { InitialChecks for validation, checkNewUser ,hashPassword, saveUser}

  -> (userLogin) -> {checkUserExists, checkPassword, make jwt token, return token and user}

- make middleware for registerInitialCheck

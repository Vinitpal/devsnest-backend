# Day14 planing

- start server on port (5000)

- set up database connection (sequelize)

- make a model (User) -> {id, name, role, email, password}

- setup routes -> {register, adminRegister, superAdminRegister, userLogin, adminLogin, superAdminLogin}

- setup working logic functions in controllers

  -> (register, adminRegister, superAdminRegister) -> { InitialChecks for validation, role ,registerController}

  -> (userLogin) -> {checkUserExists, checkPassword, make jwt token, return token and user}

  -> (adminLogin, superAdminLogin) -> {checkUserExists, checkRole, checkPassword, make jwt token, return token and user}

- make middleware for registerInitialCheck, checkUserExists, checkPassword
- make controllers
  -> (register) -> {alreadyExists, hashPassword, save}

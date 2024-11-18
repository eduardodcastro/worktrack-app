import React, { useState, useContext } from "react";

import { EmployerUser } from "./EmployerUser";
import { EmployeeUser } from "./EmployeeUser";

import { AuthContext } from "../contexts/AuthContext";

export function TypeUserStack() {

  const { user } = useContext(AuthContext);
  
  const typeUserEmployer = user.role === 'EMPLOYER' ? true : false;

  return typeUserEmployer ? <EmployerUser /> : <EmployeeUser />;
}

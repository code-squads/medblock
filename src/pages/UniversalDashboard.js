import React from "react";
import { Redirect } from "react-router-dom";

import { PatientDashboard, HospitalDashboard, AdminDashboard } from "./";

import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import { useAuth } from "../services/authorization";

const UniversalDashboard = () => {
  const auth = useAuth();

  if (!auth.loggedIn || !auth.entityInfo || !auth.wallet || !auth.authority) {
    auth.logout();
    return <Redirect to="/" />;
  }

  if (auth.authority === AUTHORITY_TYPES.ADMIN) return <AdminDashboard />;
  if (auth.authority === AUTHORITY_TYPES.HOSPITAL) return <HospitalDashboard />;
  if (auth.authority === AUTHORITY_TYPES.PATIENT) return <PatientDashboard />;

  return <Redirect to="/" />;
};

export default UniversalDashboard;

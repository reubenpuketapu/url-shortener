import { connect } from "mongoose";
import { environment } from "../environment/environment";

export const setupDbConnection = async () => {
  await connect(environment.dbUrl, {user: environment.dbUsername, pass: environment.dbPassword, authMechanism: 'DEFAULT', authSource: 'admin'});
}
import { IUser } from "./schema/userSchema"

export interface IExtendedRequest<T> extends Request {
  reqUser: T
}

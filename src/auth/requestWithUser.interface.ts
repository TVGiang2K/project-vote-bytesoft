
import { Request } from 'express';
import { Account } from 'src/module/account/account.entity';
 
interface RequestWithUser extends Request {
  user: Account;
}
 
export default RequestWithUser;
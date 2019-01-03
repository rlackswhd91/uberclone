import { Resolvers } from '../../../types/resolvers';
import { EmailSignInResponse, EmailSignInMutationArgs } from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';


const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "No User found with that email",
            token: null
          };
        }
        const checkedPassword = await user.comparePassword(password);
        if (checkedPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token
          }
        } else {
          return {
            ok: false,
            error: 'wrong password',
            token: null
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
}
export default resolvers;
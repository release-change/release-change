import { getUser } from "./get-user.js";

import { DEFAULT_COMMITTER_NAME } from "./constants.js";

/**
 * Sets the committer name based on the GitHub user.
 * @param env - The whole available environment variables.
 * @return The login of the GitHub user if available, the default committer name otherwise.
 */
export const setCommitterName = async (env: NodeJS.ProcessEnv): Promise<string> => {
  const user = await getUser(env);
  return user ? user.login : DEFAULT_COMMITTER_NAME;
};

import { getUser } from "./get-user.js";

import { DEFAULT_COMMITTER_EMAIL } from "./constants.js";

/**
 * Sets the committer e-mail address based on whether a known app environment is enabled or not.
 *
 * @param env - The whole available environment variables.
 * @return The generic e-mail address formed with the id and login of the GitHub user if available, the default committer e-mail otherwise.
 */
export const setCommitterEmail = async (env: NodeJS.ProcessEnv): Promise<string> => {
  const user = await getUser(env);
  if (user) {
    const { login, id } = user;
    return `${id}+${login}@users.noreply.github.com`;
  }
  return DEFAULT_COMMITTER_EMAIL;
};

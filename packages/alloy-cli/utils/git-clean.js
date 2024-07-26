const { simpleGit } = require('simple-git');

/**
 * Checks if the git repo is clean or not
 * @returns {Promise<boolean>} - Whether the git repo is clean or not
 */
async function isRepoClean() {
  const git = simpleGit();

  return await git.status().then((status) => {
    return status.isClean();
  });
}

module.exports = { isRepoClean };

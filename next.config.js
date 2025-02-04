const childProcess = require('child_process');

const withNextI18n = require('next-intl/plugin')();


const buildId = childProcess
  .execSync('git rev-parse HEAD')
  .toString()
  .trim();


module.exports = withNextI18n({
  generateBuildId: () => buildId,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
});

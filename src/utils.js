const os = require('os')

function mapArch (arch) {
  const mappings = {
    ia32: '386',
    x64: 'amd64'
  }

  return mappings[arch] || arch
}

function normalizeVersionName (version) {
  return version.replace(/^nightly-[0-9a-f]{40}$/, 'nightly')
}

function getDownloadObject (version) {
  const platform = os.platform()
  const filename = `conduit_${normalizeVersionName(version)}_${platform}_${mapArch(os.arch())}`
  const extension = platform === 'win32' ? 'zip' : 'tar.gz'
  const url = `https://github.com/conduitxyz/conduit-cli/releases/download/${version}/${filename}.${extension}`

  return {
    url,
    binPath: '.'
  }
}

module.exports = {
  getDownloadObject
}
